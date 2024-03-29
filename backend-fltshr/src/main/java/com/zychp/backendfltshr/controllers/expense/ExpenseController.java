package com.zychp.backendfltshr.controllers.expense;

import com.zychp.backendfltshr.dtos.expense.ExpenseCDTO;
import com.zychp.backendfltshr.dtos.expense.ExpenseDTO;
import com.zychp.backendfltshr.dtos.expense.ExpenseListCDTO;
import com.zychp.backendfltshr.dtos.expense.ExpenseListDTO;
import com.zychp.backendfltshr.services.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/expense")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @GetMapping("/lists")
    ResponseEntity<List<ExpenseListDTO>> getExpensgetAllNotSettledExpenseListseLists() {
        return ResponseEntity.ok(expenseService.getAllNotSettledExpenseLists());
    }

    @PostMapping("/list")
    ResponseEntity<ExpenseListDTO> createExpenseList(@RequestBody ExpenseListCDTO expenseListCDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.createExpenseList(expenseListCDTO));
    }

    @GetMapping("/list/{expenseListId}/expenses")
    ResponseEntity<List<ExpenseDTO>> getExpenses(@PathVariable Long expenseListId) {
        return ResponseEntity.ok(expenseService.getExpenses(expenseListId));
    }

    @PostMapping("/list/{expenseListId}/expense")
    ResponseEntity<ExpenseDTO> createExpense(@PathVariable Long expenseListId,
                                             @RequestBody ExpenseCDTO expenseCDTO) {
        return ResponseEntity.accepted().body(expenseService.createExpense(expenseListId, expenseCDTO));
    }

    @DeleteMapping("/list/{expenseListId}/expense/{expenseId}")
    ResponseEntity deleteExpense(@PathVariable Long expenseListId, @PathVariable Long expenseId){
        expenseService.deleteExpense(expenseId);
        return ResponseEntity.accepted().build();
    }
}
