package com.zychp.backendfltshr.repos.shopping;

import com.zychp.backendfltshr.model.shopping.ShoppingList;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ShoppingListRepository extends CrudRepository<ShoppingList, Long> {
    List<ShoppingList> findByArchivedFalse();
}
