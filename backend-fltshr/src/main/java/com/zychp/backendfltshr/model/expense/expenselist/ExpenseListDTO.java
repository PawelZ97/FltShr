package com.zychp.backendfltshr.model.expense.expenselist;

import lombok.Data;
@Data
public class ExpenseListDTO {
    private Long id;
    private String name;
    private Boolean isSettled;

    public static ExpenseListDTO valueOf(ExpenseList entity) {
        ExpenseListDTO dto = new ExpenseListDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setIsSettled(entity.getIsSettled());
        return dto;
    }
}

