package com.zychp.backendfltshr.services;

import com.zychp.backendfltshr.model.expense.expense.Expense;
import com.zychp.backendfltshr.model.expense.expense.ExpenseCDTO;
import com.zychp.backendfltshr.model.expense.expense.ExpenseDTO;
import com.zychp.backendfltshr.model.expense.expenselist.ExpenseList;
import com.zychp.backendfltshr.model.expense.expenselist.ExpenseListCDTO;
import com.zychp.backendfltshr.model.expense.expenselist.ExpenseListDTO;
import com.zychp.backendfltshr.model.expense.expenseunequal.ExpenseUnequal;
import com.zychp.backendfltshr.repos.UserRepository;
import com.zychp.backendfltshr.repos.expense.ExpenseListRepository;
import com.zychp.backendfltshr.repos.expense.ExpenseRepsitory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExpenseService {
    private final ExpenseListRepository expenseListRepository;
    private final ExpenseRepsitory expenseRepsitory;
    private final UserRepository userRepository;

    public List<ExpenseListDTO> getAllNotSettledExpenseLists() {
        List<ExpenseList> expenseList = expenseListRepository.findByIsSettledIsFalse();
        log.info("getAllExpenseLists()");
        return expenseList.stream().map(ExpenseListDTO::valueOf).collect(Collectors.toList());
    }

    public List<ExpenseListDTO> getAllExpenseLists() {
        List<ExpenseList> expenseList = (List<ExpenseList>) expenseListRepository.findAll();
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
        Set<ExpenseUnequal> expenseUnequals = received.getExpenseUnequals();
        if (received.getUnequalType().equals("PERCENT")) {
            BigDecimal percentSum = new BigDecimal(0);
            for(ExpenseUnequal expenseUnequal : expenseUnequals) {
                percentSum = percentSum.add(expenseUnequal.getPercent());
            }
            if(!percentSum.equals(new BigDecimal(100))) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Percents don't sum up to 100%");
            }
            expenseUnequals.forEach((expenseUnequal) -> {
                expenseUnequal.setValue(expenseUnequal.getPercent().multiply(received.getTotal())
                        .divide(BigDecimal.valueOf(100),4, RoundingMode.UP));
            });
            log.info("createExpense() percentSum:{}  precent > value convert & check", percentSum);
        } else if (received.getUnequalType().equals("UNITS")) {
            Long unitsSum = 0L;
            for(ExpenseUnequal expenseUnequal : expenseUnequals) {
                unitsSum += expenseUnequal.getUnits();
            }
            for(ExpenseUnequal expenseUnequal : expenseUnequals) {
                expenseUnequal.setValue(BigDecimal.valueOf(expenseUnequal.getUnits()).multiply(received.getTotal())
                        .divide(BigDecimal.valueOf(unitsSum), 4, RoundingMode.UP));
            }
            log.info("createExpense() unitsSum:{} units > value convert", unitsSum);
        } else {
            BigDecimal sum = new BigDecimal(0);
            for(ExpenseUnequal expenseUnequal : expenseUnequals) {
                sum = sum.add(expenseUnequal.getValue());
            }
            if(!sum.equals(received.getTotal())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Values don't sum up to Total");
            }
            log.info("createExpense() value check");
        }

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
