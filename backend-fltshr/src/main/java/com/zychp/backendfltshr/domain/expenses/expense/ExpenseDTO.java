package com.zychp.backendfltshr.domain.expenses.expense;

import com.zychp.backendfltshr.domain.expenses.expenseunequal.ExpenseUnequal;
import com.zychp.backendfltshr.domain.expenses.expenseunequal.ExpenseUnequalDTO;
import com.zychp.backendfltshr.domain.user.dto.UserNameDTO;
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
    private Boolean isEqual;
    private UserNameDTO paidBy;
    private Timestamp boughtDate;
    private String description;
    private Set<ExpenseUnequalDTO> expenseUnequals;

    public static ExpenseDTO valueOf(Expense entity) {
        ExpenseDTO dto = new ExpenseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setTotal(entity.getTotal());
        dto.setIsEqual(entity.getIsEqual());
        dto.setPaidBy(UserNameDTO.valueOf(entity.getPaidBy()));
        dto.setBoughtDate(entity.getBoughtDate());
        dto.setDescription(entity.getDescription());

        Set<ExpenseUnequal> expenseUnequals = entity.getExpenseUnequals();
        dto.setExpenseUnequals(expenseUnequals.stream().map(ExpenseUnequalDTO::valueOf).collect(Collectors.toSet()));
        return dto;
    }
}
