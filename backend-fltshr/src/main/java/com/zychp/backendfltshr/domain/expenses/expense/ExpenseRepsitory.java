package com.zychp.backendfltshr.domain.expenses.expense;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExpenseRepsitory extends CrudRepository<Expense, Long> {
    List<Expense> findByExpenseListId(Long expenseListId);
}
