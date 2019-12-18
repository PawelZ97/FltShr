package com.zychp.backendfltshr.dtos.expense;

import com.zychp.backendfltshr.dtos.user.UserNameDTO;
import com.zychp.backendfltshr.model.expense.Expense;
import com.zychp.backendfltshr.model.expense.ExpenseUnequal;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ExpenseDTO {
    private Long id;
    private String name;
    private BigDecimal total;
    private String unequalType;
    private UserNameDTO paidBy;
    private Timestamp boughtDate;
    private String description;
    private Set<ExpenseUnequalDTO> expenseUnequals;

    public static ExpenseDTO valueOf(Expense entity) {
        ExpenseDTO dto = new ExpenseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setTotal(entity.getTotal());
        dto.setUnequalType(entity.getUnequalType());
        dto.setPaidBy(UserNameDTO.valueOf(entity.getPaidBy()));
        dto.setBoughtDate(entity.getBoughtDate());
        dto.setDescription(entity.getDescription());

        Set<ExpenseUnequal> expenseUnequals = entity.getExpenseUnequals();
        if (expenseUnequals == null) {
            dto.setExpenseUnequals(null);
            return dto;
        }
        dto.setExpenseUnequals(expenseUnequals.stream().map(ExpenseUnequalDTO::valueOf).collect(Collectors.toSet()));
        return dto;
    }
}
