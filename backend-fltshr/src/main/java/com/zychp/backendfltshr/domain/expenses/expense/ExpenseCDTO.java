package com.zychp.backendfltshr.domain.expenses.expense;

import com.zychp.backendfltshr.domain.expenses.expenseunequal.ExpenseUnequalCDTO;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ExpenseCDTO {
    private String name;
    private BigDecimal total;
    private Boolean isEqual;
    private String description;
    private Set<ExpenseUnequalCDTO> expenseUnequals;

    public static Expense valueOf(ExpenseCDTO dto) {
        Expense entity = new Expense();
        entity.setName(dto.getName());
        entity.setTotal(dto.getTotal());
        entity.setIsEqual(dto.getIsEqual());
        entity.setDescription(dto.getDescription());

        Set<ExpenseUnequalCDTO> expenseUnequalsCDTOs = dto.getExpenseUnequals();
        entity.setExpenseUnequals(expenseUnequalsCDTOs.stream().map(ExpenseUnequalCDTO::valueOf).collect(Collectors.toSet()));
        return entity;
    }
}
