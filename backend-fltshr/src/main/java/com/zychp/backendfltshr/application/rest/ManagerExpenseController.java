package com.zychp.backendfltshr.application.rest;

import com.zychp.backendfltshr.domain.expenses.expenselist.ExpenseList;
import com.zychp.backendfltshr.domain.expenses.expenselist.ExpenseListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "manager/expense")
@RequiredArgsConstructor
public class ManagerExpenseController {
    private final ExpenseListRepository expenseListRepository;

    @DeleteMapping("/list/{expenseListId}")
    ResponseEntity deleteExpenseList(@PathVariable Long expenseListId) {
        expenseListRepository.deleteById(expenseListId);
        return ResponseEntity.accepted().build();
    }

    @PatchMapping("/list/{expenseListId}")
    ResponseEntity setSetteled(@PathVariable Long expenseListId) {
        ExpenseList expenseList = expenseListRepository.findById(expenseListId).orElseThrow();
        expenseList.setIsSettled(true);
        expenseListRepository.save(expenseList);
        return ResponseEntity.accepted().build();
    }
}
