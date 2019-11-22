package com.zychp.backendfltshr.repos.expense;

import com.zychp.backendfltshr.model.expense.expenselist.ExpenseList;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExpenseListRepository extends CrudRepository<ExpenseList, Long> {
    List<ExpenseList> findByIsSettledIsFalse();
}
