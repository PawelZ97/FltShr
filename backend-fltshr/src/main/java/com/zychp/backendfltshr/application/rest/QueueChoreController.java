package com.zychp.backendfltshr.application.rest;

import com.zychp.backendfltshr.domain.chores.queuechores.AssignedQueueChore;
import com.zychp.backendfltshr.domain.chores.queuechores.AssignedQueueChoreDTO;
import com.zychp.backendfltshr.domain.chores.queuechores.AssignedQueueChoreRepository;
import com.zychp.backendfltshr.domain.expenses.expenselist.ExpenseList;
import com.zychp.backendfltshr.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/chores")
@RequiredArgsConstructor
public class QueueChoreController {
    private final AssignedQueueChoreRepository assignedQueueChoreRepository;
    private final UserRepository userRepository;

    @GetMapping("/assignedqueues")
    ResponseEntity<List<AssignedQueueChoreDTO>> getAssignedQueueChores() {
        List<AssignedQueueChore> assignedQueueChores = (List<AssignedQueueChore>) assignedQueueChoreRepository.findAll();
        System.out.println("assignedQueueChores = " + assignedQueueChores);
        return ResponseEntity.ok(assignedQueueChores.stream()
                .map(AssignedQueueChoreDTO::valueOf).collect(Collectors.toList()));
    }

    @GetMapping("/assignedqueues/me")
    ResponseEntity<List<AssignedQueueChoreDTO>> getAssignedQueueChoresMe() {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        List<AssignedQueueChore> assignedQueueChores = (List<AssignedQueueChore>)
                assignedQueueChoreRepository.findByAssignedUser_UsernameAndAndDoneIsFalse(requestUsername);
        return ResponseEntity.ok(assignedQueueChores.stream()
                .map(AssignedQueueChoreDTO::valueOf).collect(Collectors.toList()));
    }

    @PatchMapping("/assignedqueue/{queueChoreId}")
    ResponseEntity setDone(@PathVariable Long queueChoreId) {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();

        AssignedQueueChore doneChore = assignedQueueChoreRepository.findById(queueChoreId).orElseThrow();
        if (doneChore.getDone()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Chore already done");
        }
        if (!doneChore.getAssignedUser().getUsername().equals(requestUsername)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Chore not yours");
        }
        doneChore.setDone(true);
        doneChore.setDoneDate(new Timestamp(System.currentTimeMillis()));
        AssignedQueueChore responseChore = assignedQueueChoreRepository.save(doneChore);

        AssignedQueueChore autoAssign = new AssignedQueueChore();
        autoAssign.setDone(false);
        autoAssign.setQueueChore(doneChore.getQueueChore());

        Long newUserId = (doneChore.getAssignedUser().getId() - 2) % (userRepository.count()-2) + 3;
        autoAssign.setAssignedUser(userRepository.findById(newUserId).orElseThrow());

        assignedQueueChoreRepository.save(autoAssign);
        return ResponseEntity.accepted().body(AssignedQueueChoreDTO.valueOf(responseChore));
    }
}
