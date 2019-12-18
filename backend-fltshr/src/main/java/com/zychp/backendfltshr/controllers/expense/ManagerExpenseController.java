package com.zychp.backendfltshr.controllers.expense;

import com.zychp.backendfltshr.dtos.expense.ExpenseListDTO;
import com.zychp.backendfltshr.dtos.expense.ExpenseSettleUpDTO;
import com.zychp.backendfltshr.services.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "manager/expense")
@RequiredArgsConstructor
public class ManagerExpenseController {
    private final ExpenseService expenseService;

    @GetMapping("/lists")
    ResponseEntity<List<ExpenseListDTO>> getAllExpenseLists() {
        return ResponseEntity.ok(expenseService.getAllExpenseLists());
    }

    @GetMapping("/list/{expenseListId}/settle")
    ResponseEntity<List<ExpenseSettleUpDTO>> getSettleUpSummary(@PathVariable Long expenseListId) {
        return ResponseEntity.ok(expenseService.getSettleUpSummary(expenseListId));
    }

    @PatchMapping("/list/{expenseListId}")
    ResponseEntity setSetteled(@PathVariable Long expenseListId) {
        expenseService.setSetteled(expenseListId);
        return ResponseEntity.accepted().build();
    }
}
