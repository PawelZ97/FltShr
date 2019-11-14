package com.zychp.backendfltshr.domain.shopping;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shopping_items")
public class ShoppingItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "shoppingItem")
    Set<ShoppingEntry> shoppingEntries;

    public ShoppingItem(String description) {
        this.description = description;
    }

    public static ShoppingItem valueOf(ShoppingItemDTO dto) {
        ShoppingItem entity = new ShoppingItem();
        entity.setId(dto.getId());
        entity.setDescription(dto.getDescription());
        return entity;
    }
}