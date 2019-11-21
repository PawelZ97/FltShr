package com.zychp.backendfltshr.model.shopping;

import com.zychp.backendfltshr.model.user.UserNameDTO;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ShoppingEntryDTO {
   private Long id;
   private ShoppingItemDTO shoppingItem;
   private UserNameDTO user;
   private Boolean isBought;
   private Timestamp boughtDate;

    public static ShoppingEntryDTO valueOf(ShoppingEntry entity) {
        ShoppingEntryDTO dto = new ShoppingEntryDTO();
        dto.setId(entity.getId());
        dto.setShoppingItem(ShoppingItemDTO.valueOf(entity.getShoppingItem()));
        dto.setUser(UserNameDTO.valueOf(entity.getUser()));
        dto.setIsBought(entity.getIsBought());
        dto.setBoughtDate(entity.getBoughtDate());
        return dto;
    }
}

