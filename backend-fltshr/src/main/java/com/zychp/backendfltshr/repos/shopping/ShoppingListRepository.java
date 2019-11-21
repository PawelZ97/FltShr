package com.zychp.backendfltshr.repos.shopping;

import com.zychp.backendfltshr.model.shopping.ShoppingList;
import org.springframework.data.repository.CrudRepository;

public interface ShoppingListRepository extends CrudRepository<ShoppingList, Long> {
}
