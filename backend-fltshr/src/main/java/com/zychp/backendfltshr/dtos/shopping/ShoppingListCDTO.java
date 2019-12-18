package com.zychp.backendfltshr.dtos.shopping;

import com.zychp.backendfltshr.model.shopping.ShoppingList;
import lombok.Data;

@Data
public class ShoppingListCDTO {
    private String name;
    private String description;

    public static ShoppingList valueOf(ShoppingListCDTO dto) {
        ShoppingList entity = new ShoppingList();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        return entity;
    }
}