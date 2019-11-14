package com.zychp.backendfltshr.application.rest.shopping;

import com.zychp.backendfltshr.domain.shopping.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/shopping")
@RequiredArgsConstructor
public class ShoppingController {
    private final ShoppingListRepository shoppingListRepository;
    private final ShoppingItemRepository shoppingItemRepository;
    private final ShoppingEntryRepository shoppingEntryRepository;

    @GetMapping("/lists")
    List<ShoppingListDTO> getShoppingLists() {
        List<ShoppingList> shoppingLists = (List<ShoppingList>) shoppingListRepository.findAll();
        return shoppingLists.stream().map(e -> ShoppingListDTO.valueOf(e)).collect(Collectors.toList());
    }

    @PostMapping("/list")
    ShoppingListDTO createNewShoppingList(@RequestBody ShoppingListDTO shoppingListDTO) {
        shoppingListRepository.save(new ShoppingList(shoppingListDTO.getDescription()));
        return shoppingListDTO;
    }

    @DeleteMapping("/list/{ListId}")
    void deleteShoppingList(@PathVariable Long ListId) {
        shoppingListRepository.deleteById(ListId);
    }

    @GetMapping("/items")
    List<ShoppingItemDTO> getShoppingItems() {
        List<ShoppingItem> shoppingItems = (List<ShoppingItem>) shoppingItemRepository.findAll();
        return shoppingItems.stream().map(e -> ShoppingItemDTO.valueOf(e)).collect(Collectors.toList());
    }

    @GetMapping("/list/{listId}/entries")
    List<ShoppingEntryDTO> getShoppingListItems(@PathVariable Long listId) {
        List<ShoppingEntry> shoppingEntries = shoppingEntryRepository.findByShoppingListId(listId);
        return shoppingEntries.stream().map(e -> ShoppingEntryDTO.valueOf(e)).collect(Collectors.toList());
    }

    @PostMapping("/list/{listId}/item")
    ShoppingItemDTO addShoppingItem(@PathVariable Long listId, @RequestBody ShoppingItemDTO shoppingItemDTO) {
        ShoppingItem shoppingItem = shoppingItemRepository.findById(shoppingItemDTO.getId()).orElse(null);
        if (shoppingItem == null) {
            shoppingItem = shoppingItemRepository.save(new ShoppingItem(shoppingItemDTO.getDescription()));
        }
        ShoppingList shoppingList = shoppingListRepository.findById(listId).orElse(null);
        shoppingEntryRepository.save(new ShoppingEntry(shoppingList, shoppingItem));
        return shoppingItemDTO;
    }

    @DeleteMapping("/list/{listId}/item/{itemId}")
    void deleteShoppingEntry(@PathVariable Long listId, @PathVariable Long itemId) {
        ShoppingEntry shoppingEntry = shoppingEntryRepository.findByShoppingListIdAndShoppingItemId(listId, itemId);
        shoppingEntryRepository.delete(shoppingEntry);
    }

    @PatchMapping("/list/{listId}/item/{itemId}")
    Boolean markAsEntryAsBought(@PathVariable Long listId, @PathVariable Long itemId) {
        ShoppingEntry shoppingEntry = shoppingEntryRepository.findByShoppingListIdAndShoppingItemId(listId, itemId);
        shoppingEntry.setIsBought(true);
        shoppingEntry.setBoughtDate(new Timestamp(System.currentTimeMillis()));
        Object user = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        System.out.println("user = " + user);
        shoppingEntry.setUser(null);
        shoppingEntryRepository.save(shoppingEntry);
        return true;
    }
}
