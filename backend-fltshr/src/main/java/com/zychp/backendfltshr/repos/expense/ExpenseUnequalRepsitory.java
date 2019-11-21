package com.zychp.backendfltshr.repos.expense;

import com.zychp.backendfltshr.model.expense.expenseunequal.ExpenseUnequal;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExpenseUnequalRepsitory extends CrudRepository<ExpenseUnequal, Long> {
    List<ExpenseUnequal> findAllByExpenseId(Long expenseId);
}
