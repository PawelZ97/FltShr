package com.zychp.backendfltshr.repos.expense;

import com.zychp.backendfltshr.model.expense.expenselist.ExpenseList;
import org.springframework.data.repository.CrudRepository;

public interface ExpenseListRepository extends CrudRepository<ExpenseList, Long> {
}
