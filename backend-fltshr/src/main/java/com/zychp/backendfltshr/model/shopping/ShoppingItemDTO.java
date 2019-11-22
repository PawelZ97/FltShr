package com.zychp.backendfltshr.model.shopping;

import lombok.Data;

@Data
public class ShoppingItemDTO {
    private Long id;
    private String name;
    private String description;

    public static ShoppingItemDTO valueOf(ShoppingItem entity) {
        ShoppingItemDTO dto = new ShoppingItemDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        return dto;
    }

    public static ShoppingItem valueOf(ShoppingItemDTO dto) {
        ShoppingItem entity = new ShoppingItem();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        return entity;
    }
}