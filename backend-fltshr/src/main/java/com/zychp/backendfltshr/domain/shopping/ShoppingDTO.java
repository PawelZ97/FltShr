package com.zychp.backendfltshr.domain.shopping;

import com.zychp.backendfltshr.domain.user.dto.UserNameDTO;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ShoppingDTO {
   private Long id;
   private ShoppingItemDTO shoppingItem;
   private UserNameDTO user;
   private Boolean isBought;
   private Timestamp boughtDate;

    public static ShoppingDTO valueOf(Shopping entity) {
        ShoppingDTO dto = new ShoppingDTO();
        dto.setId(entity.getId());
        dto.setShoppingItem(ShoppingItemDTO.valueOf(entity.getShoppingItem()));
        dto.setUser(UserNameDTO.valueOf(entity.getUser()));
        dto.setIsBought(entity.getIsBought());
        dto.setBoughtDate(entity.getBoughtDate());
        return dto;
    }
}

