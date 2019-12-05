package com.zychp.backendfltshr.model.expense.expenseunequal;

import com.zychp.backendfltshr.model.user.UserNameDTO;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ExpenseUnequalDTO {
    private Long id;
    private BigDecimal value;
    private Long units;
    private BigDecimal percent;
    private UserNameDTO usedBy;

    public static ExpenseUnequalDTO valueOf(ExpenseUnequal entity) {
        ExpenseUnequalDTO dto = new ExpenseUnequalDTO();
        dto.setId(entity.getId());
        dto.setValue(entity.getValue());
        dto.setUnits(entity.getUnits());
        dto.setPercent(entity.getPercent());
        dto.setUsedBy(UserNameDTO.valueOf(entity.getUsedBy()));
        return dto;
    }
}