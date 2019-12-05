package com.zychp.backendfltshr.model.expense;

import com.zychp.backendfltshr.model.user.UserNameDTO;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ExpenseSettleUpDTO {
    private UserNameDTO user;
    private BigDecimal total;
    //private List<BigDecimal> transfer;
}
