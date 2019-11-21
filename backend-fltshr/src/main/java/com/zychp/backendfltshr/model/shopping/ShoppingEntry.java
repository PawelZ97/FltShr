package com.zychp.backendfltshr.model.shopping;

import com.zychp.backendfltshr.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shopping_entries")
public class ShoppingEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "shopping_list", nullable = false)
    private ShoppingList shoppingList;

    @ManyToOne
    @JoinColumn(name = "item", nullable = false)
    private ShoppingItem shoppingItem;

    @ManyToOne
    @JoinColumn(name = "bought_by")
    private User user;

    @Column(name = "bought")
    private Boolean isBought;

    @Column(name = "bought_date")
    private Timestamp boughtDate;


    public ShoppingEntry(ShoppingList shoppingList, ShoppingItem shoppingItem) {
        this.shoppingList = shoppingList;
        this.shoppingItem = shoppingItem;
    }
}
