package com.zychp.backendfltshr.services;

import com.zychp.backendfltshr.model.shopping.*;
import com.zychp.backendfltshr.repos.UserRepository;
import com.zychp.backendfltshr.repos.shopping.ShoppingEntryRepository;
import com.zychp.backendfltshr.repos.shopping.ShoppingItemRepository;
import com.zychp.backendfltshr.repos.shopping.ShoppingListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShoppingService {
    private final ShoppingListRepository shoppingListRepository;
    private final ShoppingItemRepository shoppingItemRepository;
    private final ShoppingEntryRepository shoppingEntryRepository;
    private final UserRepository userRepository;

    public List<ShoppingListDTO> getShoppingLists() {
        List<ShoppingList> shoppingLists = shoppingListRepository.findByArchivedFalse();
        log.info("getShoppingLists()");
        return shoppingLists.stream().map(ShoppingListDTO::valueOf).collect(Collectors.toList());
    }

    public ShoppingListDTO createNewShoppingList(ShoppingListCDTO shoppingListCDTO) {
        ShoppingList toCreate = ShoppingListCDTO.valueOf(shoppingListCDTO);
        toCreate.setArchived(false);
        ShoppingList saved = shoppingListRepository.save(toCreate);
        log.info("createNewShoppingList() shoppingListCDTO: {}", shoppingListCDTO);
        return ShoppingListDTO.valueOf(saved);
    }

    public void archiveShoppingList(Long listId) {
        ShoppingList toArchive = shoppingListRepository.findById(listId).orElseThrow();
        toArchive.setArchived(true);
        shoppingListRepository.save(toArchive);
        log.info("archiveShoppingList() listId: {}", listId);
    }

    public List<ShoppingItemDTO> getShoppingItems() {
        List<ShoppingItem> shoppingItems = (List<ShoppingItem>) shoppingItemRepository.findAll();
        log.info("getShoppingItems()");
        return shoppingItems.stream().map(ShoppingItemDTO::valueOf).collect(Collectors.toList());
    }

    public List<ShoppingEntryDTO> getShoppingListItems(Long listId) {
        List<ShoppingEntry> shoppingEntries = shoppingEntryRepository.findByShoppingListId(listId);
        log.info("getShoppingListItems() listId: {}", listId);
        return shoppingEntries.stream().map(ShoppingEntryDTO::valueOf).collect(Collectors.toList());
    }

    public ShoppingItemDTO createShoppingEntry(Long listId, ShoppingItemDTO shoppingItemDTO) {
        ShoppingItem shoppingItem;
        if (shoppingItemDTO.getId() == null) {
            shoppingItem = shoppingItemRepository.save(ShoppingItemDTO.valueOf(shoppingItemDTO));
        } else {
            shoppingItem = shoppingItemRepository.findById(shoppingItemDTO.getId()).orElse(null);
        }
        ShoppingList shoppingList = shoppingListRepository.findById(listId).orElseThrow();
        if (shoppingList.getArchived()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "List archived. can't edit");
        }
        shoppingEntryRepository.save(new ShoppingEntry(shoppingList, shoppingItem));
        log.info("addShoppingItem() listId: {}, shoppingItemDTO: {}", listId, shoppingItemDTO);
        return shoppingItemDTO;
    }

    public void deleteShoppingEntry(Long shoppingEntryId, Long shoppingListId) {
        ShoppingEntry shoppingEntry = shoppingEntryRepository.findByIdAndShoppingListId(shoppingEntryId, shoppingListId);
        shoppingEntryRepository.delete(shoppingEntry);
        log.info("deleteShoppingEntry() shoppingEntryId: {}, itemId: {}", shoppingEntryId, shoppingListId);
    }

    public ShoppingEntryDTO markAsEntryAsBought(Long shoppingEntryId, Long shoppingListId) {
        ShoppingEntry shoppingEntry = shoppingEntryRepository.findByIdAndShoppingListId(shoppingEntryId, shoppingListId);
        shoppingEntry.setIsBought(true);
        shoppingEntry.setBoughtDate(new Timestamp(System.currentTimeMillis()));
        String userName = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        shoppingEntry.setUser(userRepository.findByUsername(userName).orElse(null));
        ShoppingEntry setDone = shoppingEntryRepository.save(shoppingEntry);
        log.info("markAsEntryAsBought() shoppingEntryId: {}, shoppingListId: {}", shoppingEntryId, shoppingListId);
        return ShoppingEntryDTO.valueOf(setDone);
    }
}
