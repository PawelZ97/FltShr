package com.zychp.backendfltshr.model.expense.expenselist;

import lombok.Data;

@Data
public class ExpenseListCDTO {
    private String name;

    public static ExpenseList valueOf(ExpenseListCDTO dto) {
        ExpenseList entity = new ExpenseList();
        entity.setName(dto.getName());
        return entity;
    }
}

