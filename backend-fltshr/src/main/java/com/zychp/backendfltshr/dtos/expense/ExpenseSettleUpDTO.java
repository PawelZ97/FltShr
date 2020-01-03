package com.zychp.backendfltshr.dtos.expense;

import lombok.Data;

import java.util.List;

@Data
public class ExpenseSettleUpDTO {
    private List<ExpenseSettleUpUserTotalDTO> totals;
    private List<ExpenseSettleUpTransferDTO> transfers;
}
