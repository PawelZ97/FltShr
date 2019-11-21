package com.zychp.backendfltshr.repos.shopping;

import com.zychp.backendfltshr.model.shopping.ShoppingEntry;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ShoppingEntryRepository extends CrudRepository<ShoppingEntry, Long> {
    List<ShoppingEntry> findByShoppingListId(Long shoppingListId);

    ShoppingEntry findByShoppingListIdAndShoppingItemId(Long shoppingListId, Long shoppingItemId);
}
