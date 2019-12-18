package com.zychp.backendfltshr.dtos.expense;

import com.zychp.backendfltshr.model.expense.ExpenseList;
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

