package com.zychp.backendfltshr.services;

import com.zychp.backendfltshr.model.expense.expense.Expense;
import com.zychp.backendfltshr.model.expense.expense.ExpenseCDTO;
import com.zychp.backendfltshr.model.expense.expense.ExpenseDTO;
import com.zychp.backendfltshr.model.expense.expenselist.ExpenseList;
import com.zychp.backendfltshr.model.expense.expenselist.ExpenseListCDTO;
import com.zychp.backendfltshr.model.expense.expenselist.ExpenseListDTO;
import com.zychp.backendfltshr.repos.UserRepository;
import com.zychp.backendfltshr.repos.expense.ExpenseListRepository;
import com.zychp.backendfltshr.repos.expense.ExpenseRepsitory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExpenseService {
    private final ExpenseListRepository expenseListRepository;
    private final ExpenseRepsitory expenseRepsitory;
    private final UserRepository userRepository;

    public List<ExpenseListDTO> getAllExpenseLists() {
        List<ExpenseList> expenseList = expenseListRepository.findByIsSettledIsFalse();
        log.info("getAllExpenseLists()");
        return expenseList.stream().map(ExpenseListDTO::valueOf).collect(Collectors.toList());
    }

    public ExpenseListDTO createExpenseList(ExpenseListCDTO expenseListCDTO) {
        ExpenseList expenseList = ExpenseListCDTO.valueOf(expenseListCDTO);
        expenseList.setIsSettled(false);
        ExpenseList createdList = expenseListRepository.save(expenseList);
        log.info("createExpenseList() expenseListCDTO: {}", expenseListCDTO);
        return ExpenseListDTO.valueOf(createdList);
    }

    public List<ExpenseDTO> getExpenses(Long expenseListId) {
        List<Expense> expenses = expenseRepsitory.findByExpenseListId(expenseListId);
        log.info("getExpenses() expenseListId: {}", expenseListId);
        return expenses.stream().map(ExpenseDTO::valueOf).collect(Collectors.toList());
    }

    public ExpenseDTO createExpense(Long expenseListId, ExpenseCDTO expenseCDTO) {
        Expense received = ExpenseCDTO.valueOf(expenseCDTO);
        String requestUsername = SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal().toString();
        received.setExpenseList(expenseListRepository.findById(expenseListId).orElseThrow());
        received.setPaidBy(userRepository.findByUsername(requestUsername).orElseThrow());
        received.setBoughtDate(new Timestamp(System.currentTimeMillis()));
        Expense created = expenseRepsitory.save(received);
        log.info("createExpense() expenseListId: {}, expenseCDTO: {}", expenseListId, expenseCDTO);
        return ExpenseDTO.valueOf(created);
    }

    public void deleteExpense(Long expenseId) {
        Expense expense = expenseRepsitory.findById(expenseId).orElseThrow();
        String paidByUsername = expense.getPaidBy().getUsername();
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        if (!requestUsername.equals(paidByUsername)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't delete others expense");
        }
        expenseRepsitory.deleteById(expenseId);
        log.info("deleteExpense() expenseId: {}", expenseId);
    }

    public void setSetteled(Long expenseListId) {
        ExpenseList expenseList = expenseListRepository.findById(expenseListId).orElseThrow();
        expenseList.setIsSettled(true);
        expenseListRepository.save(expenseList);
        log.info("setSetteled() expenseListId: {}", expenseListId);
    }
}
