package com.zychp.backendfltshr.controllers.shopping;

import com.zychp.backendfltshr.model.shopping.ShoppingEntryDTO;
import com.zychp.backendfltshr.model.shopping.ShoppingItemDTO;
import com.zychp.backendfltshr.model.shopping.ShoppingListCDTO;
import com.zychp.backendfltshr.model.shopping.ShoppingListDTO;
import com.zychp.backendfltshr.services.ShoppingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/shopping")
@RequiredArgsConstructor
public class ShoppingController {
    private final ShoppingService shoppingService;

    //TODO Hard Refactoring To Standard of Other Endpoints

    @GetMapping("/lists")
    ResponseEntity<List<ShoppingListDTO>> getShoppingLists() {
        return ResponseEntity.ok(shoppingService.getShoppingLists());
    }

    @PostMapping("/list")
    ResponseEntity<ShoppingListDTO> createNewShoppingList(@RequestBody ShoppingListCDTO shoppingListCDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(shoppingService.createNewShoppingList(shoppingListCDTO));
    }

    @DeleteMapping("/list/{ListId}")
    ResponseEntity deleteShoppingList(@PathVariable Long ListId) {
        shoppingService.deleteShoppingList(ListId);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/items")
    ResponseEntity<List<ShoppingItemDTO>> getShoppingItems() {
        return ResponseEntity.ok(shoppingService.getShoppingItems());
    }

    @GetMapping("/list/{listId}/entries")
    ResponseEntity<List<ShoppingEntryDTO>> getShoppingListItems(@PathVariable Long listId) {
        return ResponseEntity.ok(shoppingService.getShoppingListItems(listId));
    }

    @PostMapping("/list/{listId}/item")
    ResponseEntity<ShoppingItemDTO> addShoppingItem(@PathVariable Long listId,
                                                    @RequestBody ShoppingItemDTO shoppingItemDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(shoppingService.addShoppingItem(listId, shoppingItemDTO));
    }

    @DeleteMapping("/list/{listId}/item/{itemId}")
    ResponseEntity deleteShoppingEntry(@PathVariable Long listId, @PathVariable Long itemId) {
        return ResponseEntity.accepted().build();
    }

    @PatchMapping("/list/{listId}/item/{itemId}")
    ResponseEntity<ShoppingEntryDTO> markAsEntryAsBought(@PathVariable Long listId, @PathVariable Long itemId) {
        return ResponseEntity.ok(shoppingService.markAsEntryAsBought(listId, itemId));
    }
}
