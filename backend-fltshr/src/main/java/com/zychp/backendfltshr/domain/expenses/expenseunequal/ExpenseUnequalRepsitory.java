package com.zychp.backendfltshr.domain.expenses.expenseunequal;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExpenseUnequalRepsitory extends CrudRepository<ExpenseUnequal, Long> {
    List<ExpenseUnequal> findAllByExpenseId(Long expenseId);
}
