package com.zychp.backendfltshr.model.shopping;

import lombok.Data;

@Data
public class ShoppingItemDTO {
    private Long id;
    private String description;

    public static ShoppingItemDTO valueOf(ShoppingItem entity) {
        ShoppingItemDTO dto = new ShoppingItemDTO();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}