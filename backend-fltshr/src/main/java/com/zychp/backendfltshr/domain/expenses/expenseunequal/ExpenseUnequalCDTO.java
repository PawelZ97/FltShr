package com.zychp.backendfltshr.domain.expenses.expenseunequal;

import com.zychp.backendfltshr.domain.user.dto.UserNameDTO;
import lombok.Data;

@Data
public class ExpenseUnequalCDTO {
    private UserNameDTO usedBy;
    private Long units;
    private Long percent;

    public static ExpenseUnequal valueOf(ExpenseUnequalCDTO dto) {
        ExpenseUnequal entity = new ExpenseUnequal();
        entity.setUsedBy(UserNameDTO.valueOf(dto.getUsedBy()));
        entity.setUnits(dto.getUnits());
        entity.setPercent(dto.getPercent());
        return entity;
    }
}
