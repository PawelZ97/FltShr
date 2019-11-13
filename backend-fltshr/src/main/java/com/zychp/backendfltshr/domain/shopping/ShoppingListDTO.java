package com.zychp.backendfltshr.domain.shopping;

import lombok.Data;

@Data
public class ShoppingListDTO {
    private Long id;
    private String description;

    public static ShoppingListDTO valueOf(ShoppingList entity) {
        ShoppingListDTO dto = new ShoppingListDTO();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}
