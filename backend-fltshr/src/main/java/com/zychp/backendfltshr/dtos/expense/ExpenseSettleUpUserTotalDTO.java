package com.zychp.backendfltshr.dtos.expense;

import com.zychp.backendfltshr.dtos.user.UserNameDTO;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ExpenseSettleUpUserTotalDTO {
    private UserNameDTO user;
    private BigDecimal paid;
    private BigDecimal used;
    private BigDecimal total;

    public ExpenseSettleUpUserTotalDTO(ExpenseSettleUpUserTotalDTO input) {
        this.user = input.user;
        this.paid = input.paid;
        this.used = input.used;
        this.total = input.total;
    }

    public ExpenseSettleUpUserTotalDTO() {
    }
}
