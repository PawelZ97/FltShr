package com.zychp.backendfltshr.controllers.shopping;

import com.zychp.backendfltshr.dtos.shopping.ShoppingEntryDTO;
import com.zychp.backendfltshr.dtos.shopping.ShoppingItemDTO;
import com.zychp.backendfltshr.dtos.shopping.ShoppingListCDTO;
import com.zychp.backendfltshr.dtos.shopping.ShoppingListDTO;
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

    @GetMapping("/lists")
    ResponseEntity<List<ShoppingListDTO>> getShoppingLists() {
        return ResponseEntity.ok(shoppingService.getShoppingLists());
    }

    @PostMapping("/list")
    ResponseEntity<ShoppingListDTO> createNewShoppingList(@RequestBody ShoppingListCDTO shoppingListCDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(shoppingService.createNewShoppingList(shoppingListCDTO));
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
    ResponseEntity<ShoppingItemDTO> createShoppingEntry(@PathVariable Long listId,
                                                        @RequestBody ShoppingItemDTO shoppingItemDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(shoppingService.createShoppingEntry(listId, shoppingItemDTO));
    }

    @DeleteMapping("/list/{shoppingListId}/item/{shoppingEntryId}")
    ResponseEntity deleteShoppingEntry(@PathVariable Long shoppingListId, @PathVariable Long shoppingEntryId) {
        shoppingService.deleteShoppingEntry(shoppingEntryId, shoppingListId);
        return ResponseEntity.accepted().build();
    }

    @PatchMapping("/list/{shoppingListId}/item/{shoppingEntryId}")
    ResponseEntity<ShoppingEntryDTO> markAsEntryAsBought(@PathVariable Long shoppingListId,
                                                         @PathVariable Long shoppingEntryId) {
        return ResponseEntity.ok(shoppingService.markAsEntryAsBought(shoppingEntryId, shoppingListId));
    }
}
