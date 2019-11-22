package com.zychp.backendfltshr.controllers.expense;

import com.zychp.backendfltshr.services.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "manager/expense")
@RequiredArgsConstructor
public class ManagerExpenseController {
    private final ExpenseService expenseService;

//    @DeleteMapping("/list/{expenseListId}")
//    ResponseEntity deleteExpenseList(@PathVariable Long expenseListId) {
//        expenseService.deleteExpenseList(expenseListId);
//        return ResponseEntity.accepted().build();
//    }

    @PatchMapping("/list/{expenseListId}")
    ResponseEntity setSetteled(@PathVariable Long expenseListId) {
        expenseService.setSetteled(expenseListId);
        return ResponseEntity.accepted().build();
    }
}
