package com.zychp.backendfltshr.services;

import com.zychp.backendfltshr.model.shopping.*;
import com.zychp.backendfltshr.repos.UserRepository;
import com.zychp.backendfltshr.repos.shopping.ShoppingEntryRepository;
import com.zychp.backendfltshr.repos.shopping.ShoppingItemRepository;
import com.zychp.backendfltshr.repos.shopping.ShoppingListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShoppingService {
    private final ShoppingListRepository shoppingListRepository;
    private final ShoppingItemRepository shoppingItemRepository;
    private final ShoppingEntryRepository shoppingEntryRepository;
    private final UserRepository userRepository;

    public List<ShoppingListDTO> getShoppingLists() {
        List<ShoppingList> shoppingLists = (List<ShoppingList>) shoppingListRepository.findAll();
        return shoppingLists.stream().map(ShoppingListDTO::valueOf).collect(Collectors.toList());
    }

    public ShoppingListDTO createNewShoppingList(ShoppingListCDTO shoppingListCDTO) {
        ShoppingList saved = shoppingListRepository.save(ShoppingListCDTO.valueOf(shoppingListCDTO));
        return ShoppingListDTO.valueOf(saved);
    }

    public void deleteShoppingList(Long listId) {
        shoppingListRepository.deleteById(listId);
    }

    public List<ShoppingItemDTO> getShoppingItems() {
        List<ShoppingItem> shoppingItems = (List<ShoppingItem>) shoppingItemRepository.findAll();
        return shoppingItems.stream().map(ShoppingItemDTO::valueOf).collect(Collectors.toList());
    }

    public List<ShoppingEntryDTO> getShoppingListItems(Long listId) {
        List<ShoppingEntry> shoppingEntries = shoppingEntryRepository.findByShoppingListId(listId);
        return shoppingEntries.stream().map(ShoppingEntryDTO::valueOf).collect(Collectors.toList());
    }

    public ShoppingItemDTO addShoppingItem(Long listId, ShoppingItemDTO shoppingItemDTO) {
        ShoppingItem shoppingItem = shoppingItemRepository.findById(shoppingItemDTO.getId()).orElse(null);
        if (shoppingItem == null) {
            shoppingItem = shoppingItemRepository.save(ShoppingItemDTO.valueOf(shoppingItemDTO));
        }
        ShoppingList shoppingList = shoppingListRepository.findById(listId).orElse(null);
        shoppingEntryRepository.save(new ShoppingEntry(shoppingList, shoppingItem));
        return shoppingItemDTO;
    }

    public void deleteShoppingEntry(Long listId, Long itemId) {
        ShoppingEntry shoppingEntry = shoppingEntryRepository.findByShoppingListIdAndShoppingItemId(listId, itemId);
        shoppingEntryRepository.delete(shoppingEntry);
    }

    public ShoppingEntryDTO markAsEntryAsBought(Long listId, Long itemId) {
        ShoppingEntry shoppingEntry = shoppingEntryRepository.findByShoppingListIdAndShoppingItemId(listId, itemId);
        shoppingEntry.setIsBought(true);
        shoppingEntry.setBoughtDate(new Timestamp(System.currentTimeMillis()));
        String userName = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        shoppingEntry.setUser(userRepository.findByUsername(userName).orElse(null));
        ShoppingEntry setDone = shoppingEntryRepository.save(shoppingEntry);
        return ShoppingEntryDTO.valueOf(shoppingEntry);
    }
}
