package com.zychp.backendfltshr.services;

import com.zychp.backendfltshr.dtos.expense.*;
import com.zychp.backendfltshr.dtos.user.UserNameDTO;
import com.zychp.backendfltshr.model.expense.Expense;
import com.zychp.backendfltshr.model.expense.ExpenseList;
import com.zychp.backendfltshr.model.expense.ExpenseUnequal;
import com.zychp.backendfltshr.model.user.User;
import com.zychp.backendfltshr.repos.expense.ExpenseListRepository;
import com.zychp.backendfltshr.repos.expense.ExpenseRepsitory;
import com.zychp.backendfltshr.repos.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.util.ArrayList;
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
        log.info("getAllNotSettledExpenseLists()");
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
        if (received.getUnequalType() != null) {
            switch (received.getUnequalType()) {
                case "PERCENT":
                    BigDecimal percentSum = new BigDecimal(0);
                    for (ExpenseUnequal expenseUnequal : expenseUnequals) {
                        percentSum = percentSum.add(expenseUnequal.getPercent());
                    }
                    if (!percentSum.equals(new BigDecimal(100))) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Percents don't sum up to 100%");
                    }
                    for (ExpenseUnequal expenseUnequal : expenseUnequals) {
                        expenseUnequal.setValue(expenseUnequal.getPercent().multiply(received.getTotal())
                                .divide(BigDecimal.valueOf(100), 4, RoundingMode.UP));
                    }
                    log.info("createExpense() percentSum:{}  precent > value convert & check", percentSum);
                    break;
                case "UNIT":
                    Long unitsSum = 0L;
                    for (ExpenseUnequal expenseUnequal : expenseUnequals) {
                        unitsSum += expenseUnequal.getUnits();
                    }
                    for (ExpenseUnequal expenseUnequal : expenseUnequals) {
                        expenseUnequal.setValue(BigDecimal.valueOf(expenseUnequal.getUnits())
                                .multiply(received.getTotal())
                                .divide(BigDecimal.valueOf(unitsSum), 4, RoundingMode.UP));
                    }
                    log.info("createExpense() unitsSum:{} units > value convert", unitsSum);
                    break;
                case "VALUE":
                    BigDecimal sum = new BigDecimal(0);
                    for (ExpenseUnequal expenseUnequal : expenseUnequals) {
                        sum = sum.add(expenseUnequal.getValue());
                    }
                    if (!sum.equals(received.getTotal())) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Values don't sum up to Total");
                    }
                    log.info("createExpense() value check");
                    break;
            }
        }
        String requestUsername = SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal().toString();
        received.setExpenseList(expenseListRepository.findById(expenseListId).orElseThrow());
        received.setPaidBy(userRepository.findByUsernameAndDeactivatedIsFalseAndEmailVerifiedIsTrue(requestUsername));
        received.setBoughtDate(new Timestamp(TimeZoneOffsetUtils.getTimeZoneWithOffset()));
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

    public ExpenseSettleUpDTO getSettleUpSummary(Long expenseListId) {
        List<Expense> expenses = expenseRepsitory.findByExpenseListId(expenseListId);
        List<User> users = userRepository.findAllByDeactivatedIsFalseAndEmailVerifiedIsTrue();
        users.remove(0);
        ExpenseSettleUpDTO expenseSettleUpDTO = new ExpenseSettleUpDTO();
        expenseSettleUpDTO.setTotals(new ArrayList<>());
        for (User user : users) {
            ExpenseSettleUpUserTotalDTO settleUpTotalsDTO = new ExpenseSettleUpUserTotalDTO();
            settleUpTotalsDTO.setUser(UserNameDTO.valueOf(user));
            settleUpTotalsDTO.setPaid(calculateSumTotal(expenses, user));
            settleUpTotalsDTO.setUsed(calculateUsedTotal(expenses, user, users.size()));
            settleUpTotalsDTO.setTotal(settleUpTotalsDTO.getPaid().subtract(settleUpTotalsDTO.getUsed()));
            expenseSettleUpDTO.getTotals().add(settleUpTotalsDTO);
        }

        List<ExpenseSettleUpTransferDTO> transferDTOS = new ArrayList<>();
        List<ExpenseSettleUpUserTotalDTO> totals = new ArrayList<>();

        for (ExpenseSettleUpUserTotalDTO totalDTO : expenseSettleUpDTO.getTotals()) {
            totals.add(new ExpenseSettleUpUserTotalDTO(totalDTO));
        }
        int i = 3;
        while (i > 0) {
            log.info("loop START");
            i--;

            BigDecimal maxTotal = BigDecimal.ZERO;
            UserNameDTO recipient = new UserNameDTO();
            BigDecimal minTotal = BigDecimal.ZERO;
            UserNameDTO sender = new UserNameDTO();
            for (ExpenseSettleUpUserTotalDTO userTotalDTO : totals) {
                if (userTotalDTO.getTotal().compareTo(maxTotal) > 0) {
                    maxTotal = userTotalDTO.getTotal();
                    recipient = userTotalDTO.getUser();
                }
                if (userTotalDTO.getTotal().compareTo(minTotal) < 0) {
                    minTotal = userTotalDTO.getTotal();
                    sender = userTotalDTO.getUser();
                }
                System.out.println("userTotalDTOtotal = " + userTotalDTO.getTotal());
                System.out.println("minTotal = " + minTotal);
                System.out.println("maxTotal = " + maxTotal);
            }
            System.out.println("EmaxTotal = " + maxTotal);
            System.out.println("Erecipient = " + recipient);
            System.out.println("EminTotal = " + minTotal);
            System.out.println("Esender = " + sender);

            System.out.println("if = " + minTotal.equals(BigDecimal.ZERO));

            if (minTotal.equals(BigDecimal.ZERO)) {
                break;
            }

            ExpenseSettleUpTransferDTO transferDTO = new ExpenseSettleUpTransferDTO();
            transferDTO.setSender(sender);
            transferDTO.setReciepent(recipient);
            BigDecimal transferValue = minTotal.multiply(BigDecimal.valueOf(-1));
            transferDTO.setTransferValue(transferValue);

            transferDTOS.add(transferDTO);

            for (ExpenseSettleUpUserTotalDTO userTotalDTO : totals) {
                if (userTotalDTO.getUser().equals(sender)) {
                    log.info("Transfer value: {}, sender: {}", transferValue, sender);
                    userTotalDTO.setTotal(BigDecimal.valueOf(0));
                }
                if (userTotalDTO.getUser().equals(recipient)) {
                    userTotalDTO.setTotal(maxTotal.subtract(transferDTO.getTransferValue()));
                    log.info("After transfer, total: {}, reciepent: {}", userTotalDTO.getTotal(), recipient);
                }
            }
        }
        expenseSettleUpDTO.setTransfers(transferDTOS);
        log.info("ExpenseSettleUpDTO: {}", expenseSettleUpDTO);


        return expenseSettleUpDTO;
    }

    private BigDecimal calculateSumTotal(List<Expense> expenses, User user) {
        BigDecimal sum = BigDecimal.valueOf(0);
        for (Expense expense : expenses) {
            if (expense.getPaidBy().equals(user))
                sum = sum.add(expense.getTotal());
        }
        return sum.setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal calculateUsedTotal(List<Expense> expenses, User user, int size) {
        BigDecimal sum = BigDecimal.valueOf(0);
        for (Expense expense : expenses) {
            if (expense.getUnequalType() == null) {
                sum = sum.add(expense.getTotal().divide(BigDecimal.valueOf(size), 4, RoundingMode.UP));
            } else {
                Set<ExpenseUnequal> expenseUnequals = expense.getExpenseUnequals();
                for (ExpenseUnequal expenseUnequal : expenseUnequals) {
                    if (expenseUnequal.getUsedBy().equals(user))
                        sum = sum.add(expenseUnequal.getValue());
                }
            }
        }
        return sum.setScale(2, RoundingMode.HALF_UP);
    }

    public void setSetteled(Long expenseListId) {
        ExpenseList expenseList = expenseListRepository.findById(expenseListId).orElseThrow();
        expenseList.setIsSettled(true);
        expenseListRepository.save(expenseList);
        log.info("setSetteled() expenseListId: {}", expenseListId);
    }
}
