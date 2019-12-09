package com.zychp.backendfltshr.controllers.shopping;

import com.zychp.backendfltshr.services.ShoppingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "manager/shopping")
@RequiredArgsConstructor
public class ManagerShoppingController {
    private final ShoppingService shoppingService;

    @DeleteMapping("/list/{ListId}/archive")
    ResponseEntity archiveShoppingList(@PathVariable Long ListId) {
        shoppingService.archiveShoppingList(ListId);
        return ResponseEntity.accepted().build();
    }
}
