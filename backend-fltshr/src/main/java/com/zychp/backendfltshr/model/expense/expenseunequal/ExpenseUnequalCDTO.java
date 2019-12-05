package com.zychp.backendfltshr.model.expense.expenseunequal;

import com.zychp.backendfltshr.model.user.UserNameDTO;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ExpenseUnequalCDTO {
    private UserNameDTO usedBy;
    private BigDecimal value;
    private Long units;
    private BigDecimal percent;

    public static ExpenseUnequal valueOf(ExpenseUnequalCDTO dto) {
        ExpenseUnequal entity = new ExpenseUnequal();
        entity.setUsedBy(UserNameDTO.valueOf(dto.getUsedBy()));
        entity.setValue(dto.getValue());
        entity.setUnits(dto.getUnits());
        entity.setPercent(dto.getPercent());
        return entity;
    }
}
