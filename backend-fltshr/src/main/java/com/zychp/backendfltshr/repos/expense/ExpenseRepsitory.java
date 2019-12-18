package com.zychp.backendfltshr.repos.expense;

import com.zychp.backendfltshr.model.expense.Expense;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExpenseRepsitory extends CrudRepository<Expense, Long> {
    List<Expense> findByExpenseListId(Long expenseListId);
}
