package com.zychp.backendfltshr.dtos.expense;

import com.zychp.backendfltshr.dtos.user.UserNameDTO;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ExpenseSettleUpDTO {
    private UserNameDTO user;
    private BigDecimal total;
    //private List<BigDecimal> transfer;
}
