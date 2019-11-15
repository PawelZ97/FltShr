package com.zychp.backendfltshr.application.rest;

import com.zychp.backendfltshr.domain.expenses.expense.Expense;
import com.zychp.backendfltshr.domain.expenses.expense.ExpenseCDTO;
import com.zychp.backendfltshr.domain.expenses.expense.ExpenseDTO;
import com.zychp.backendfltshr.domain.expenses.expense.ExpenseRepsitory;
import com.zychp.backendfltshr.domain.expenses.expenselist.ExpenseList;
import com.zychp.backendfltshr.domain.expenses.expenselist.ExpenseListCDTO;
import com.zychp.backendfltshr.domain.expenses.expenselist.ExpenseListDTO;
import com.zychp.backendfltshr.domain.expenses.expenselist.ExpenseListRepository;
import com.zychp.backendfltshr.domain.expenses.expenseunequal.ExpenseUnequal;
import com.zychp.backendfltshr.domain.expenses.expenseunequal.ExpenseUnequalRepsitory;
import com.zychp.backendfltshr.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/expense")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseListRepository expenseListRepository;
    private final ExpenseRepsitory expenseRepsitory;
    private final ExpenseUnequalRepsitory expenseUnequalRepsitory;
    private final UserRepository userRepository;

    @GetMapping("/lists")
    ResponseEntity<List<ExpenseListDTO>> getExpenseLists() {
        List<ExpenseList> expenseList = (List<ExpenseList>) expenseListRepository.findAll();
        return ResponseEntity.ok(expenseList.stream().map(ExpenseListDTO::valueOf).collect(Collectors.toList()));
    }

    @PostMapping("/list")
    ResponseEntity<ExpenseListDTO> createExpenseList(@RequestBody ExpenseListCDTO expenseListCDTO) {
        ExpenseList expenseList = ExpenseListCDTO.valueOf(expenseListCDTO);
        expenseList.setIsSettled(false);
        ExpenseList createdList = expenseListRepository.save(expenseList);
        return ResponseEntity.status(HttpStatus.CREATED).body(ExpenseListDTO.valueOf(createdList));
    }

    @GetMapping("/list/{expenseListId}/expenses")
    ResponseEntity<List<ExpenseDTO>> getExpenses(@PathVariable Long expenseListId) {
        List<Expense> expenses = expenseRepsitory.findByExpenseListId(expenseListId);
        return ResponseEntity.ok(expenses.stream().map(ExpenseDTO::valueOf).collect(Collectors.toList()));
    }

    @PostMapping("/list/{expenseListId}/expense")
    ResponseEntity<ExpenseDTO> createExpense(@PathVariable Long expenseListId,
                                             @RequestBody ExpenseCDTO expenseDTO) {
        Expense received = ExpenseCDTO.valueOf(expenseDTO);
        String requestUsername = SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal().toString();
        received.setExpenseList(expenseListRepository.findById(expenseListId).orElseThrow());
        received.setPaidBy(userRepository.findByUsername(requestUsername).orElseThrow());
        received.setBoughtDate(new Timestamp(System.currentTimeMillis()));

        if (received.getIsEqual()) {
            Expense created = expenseRepsitory.save(received);
            return ResponseEntity.accepted().body(ExpenseDTO.valueOf(created));
        }

        Set<ExpenseUnequal> expenseUnequals = received.getExpenseUnequals();
        expenseUnequalRepsitory.saveAll(expenseUnequals);
        Expense created = expenseRepsitory.save(received);
        return ResponseEntity.accepted().body(ExpenseDTO.valueOf(created));
    }

    @DeleteMapping("/list/{expenseListId}/expense/{expenseId}")
    ResponseEntity deleteExpense(@PathVariable Long expenseListId, @PathVariable Long expenseId){
        Expense expense = expenseRepsitory.findById(expenseId).orElseThrow();
        String paidByUsername = expense.getPaidBy().getUsername();
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        if(!requestUsername.equals(paidByUsername)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Can't delete others expense");
        }
        List<ExpenseUnequal> unequalsToDelete = expenseUnequalRepsitory.findAllByExpenseId(expenseId);
        expenseUnequalRepsitory.deleteAll(unequalsToDelete);
        expenseRepsitory.deleteById(expenseId);
        return ResponseEntity.accepted().build();
    }
}
