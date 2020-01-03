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
}
