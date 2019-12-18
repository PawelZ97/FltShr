package com.zychp.backendfltshr.dtos.expense;

import com.zychp.backendfltshr.model.expense.Expense;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ExpenseCDTO {
    private String name;
    private BigDecimal total;
    private String unequalType;
    private String description;
    private Set<ExpenseUnequalCDTO> expenseUnequals;

    public static Expense valueOf(ExpenseCDTO dto) {
        Expense entity = new Expense();
        entity.setName(dto.getName());
        entity.setTotal(dto.getTotal());
        entity.setUnequalType(dto.getUnequalType());
        entity.setDescription(dto.getDescription());

        Set<ExpenseUnequalCDTO> expenseUnequalsCDTOs = dto.getExpenseUnequals();
        if(expenseUnequalsCDTOs != null) {
            entity.setExpenseUnequals(expenseUnequalsCDTOs.stream().map(ExpenseUnequalCDTO::valueOf).collect(Collectors.toSet()));
        } 
        return entity;
    }
}
