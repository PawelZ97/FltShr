package com.zychp.backendfltshr.domain.expenses.expenseunequal;

import com.zychp.backendfltshr.domain.user.dto.UserNameDTO;
import lombok.Data;

@Data
public class ExpenseUnequalDTO {
    private Long id;
    private Long units;
    private Long percent;
    private UserNameDTO usedBy;

    public static ExpenseUnequalDTO valueOf(ExpenseUnequal entity) {
        ExpenseUnequalDTO dto = new ExpenseUnequalDTO();
        dto.setId(entity.getId());
        dto.setUnits(entity.getUnits());
        dto.setPercent(entity.getPercent());
        dto.setUsedBy(UserNameDTO.valueOf(entity.getUsedBy()));
        return dto;
    }
}