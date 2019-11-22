package com.zychp.backendfltshr.model.shopping;

import lombok.Data;

@Data
public class ShoppingListDTO {
    private Long id;
    private String name;
    private String description;

    public static ShoppingListDTO valueOf(ShoppingList entity) {
        ShoppingListDTO dto = new ShoppingListDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getDescription());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}
