package com.zychp.backendfltshr.application.rest.shopping;

import com.zychp.backendfltshr.domain.shopping.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/shopping")
@RequiredArgsConstructor
public class ShoppingController {
    private final ShoppingListRepository shoppingListRepository;
    private final ShoppingItemRepository shoppingItemRepository;
    private final ShoppingRepository shoppingRepository;

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

    @GetMapping("/list/items")
    List<ShoppingDTO> getShoppingListItems(@RequestBody ShoppingListDTO shoppingListDTO) {
        List<Shopping> shoppings =  shoppingRepository.findByShoppingList_Id(shoppingListDTO.getId());
        return shoppings.stream().map(e -> ShoppingDTO.valueOf(e)).collect(Collectors.toList());
    }
}
