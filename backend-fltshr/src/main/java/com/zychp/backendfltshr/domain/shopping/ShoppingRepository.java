package com.zychp.backendfltshr.domain.shopping;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ShoppingRepository extends CrudRepository<Shopping, Long> {
    List<Shopping> findByShoppingList_Id(Long shoppingListId);
}
