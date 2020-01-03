package com.zychp.backendfltshr.dtos.expense;

import com.zychp.backendfltshr.dtos.user.UserNameDTO;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ExpenseSettleUpTransferDTO {
    BigDecimal transferValue;
    UserNameDTO reciepent;
    UserNameDTO sender;
}
