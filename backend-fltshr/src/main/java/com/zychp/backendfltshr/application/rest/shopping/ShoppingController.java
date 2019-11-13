package com.zychp.backendfltshr.application.rest.shopping;

import com.zychp.backendfltshr.domain.shopping.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/shopping")
@RequiredArgsConstructor
public class ShoppingController {
    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    private ShoppingItemRepository shoppingItemRepository;

    @Autowired
    private ShoppingRepository shoppingRepository;

    @GetMapping("/lists")
    List<ShoppingListDTO> getShoppingLists() {
        List<ShoppingList> shoppingLists = (List<ShoppingList>) shoppingListRepository.findAll();
        return shoppingLists.stream().map(e -> ShoppingListDTO.valueOf(e)).collect(Collectors.toList());
    }

    @GetMapping("/items")
    List<ShoppingItemDTO> getShoppingItems() {
        List<ShoppingItem> shoppingItems = (List<ShoppingItem>) shoppingItemRepository.findAll();
        return shoppingItems.stream().map(e -> ShoppingItemDTO.valueOf(e)).collect(Collectors.toList());
    }
}
