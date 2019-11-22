package com.zychp.backendfltshr.model.shopping;

import lombok.Data;

@Data
public class ShoppingListDTO {
    private Long id;
    private String name;
    private String description;
    private Boolean archived;

    public static ShoppingListDTO valueOf(ShoppingList entity) {
        ShoppingListDTO dto = new ShoppingListDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setArchived(entity.getArchived());
        return dto;
    }
}
