package com.zychp.backendfltshr.application.rest;

import com.zychp.backendfltshr.domain.chores.frequentchores.AssignedFrequentChore;
import com.zychp.backendfltshr.domain.chores.frequentchores.AssignedFrequentChoreDTO;
import com.zychp.backendfltshr.domain.chores.frequentchores.AssignedFrequentChoreRepository;
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
public class FrequentChoreController {
    private final AssignedFrequentChoreRepository assignedFrequentChoreRepository;

    //TODO Cron for AutoCreating New Assigments

    @GetMapping("/assignedfrequents")
    ResponseEntity<List<AssignedFrequentChoreDTO>> getAssignedFrequentChores() {
        List<AssignedFrequentChore> assignedFrequentChores = (List<AssignedFrequentChore>)
                assignedFrequentChoreRepository.findAll();
        return ResponseEntity.ok(assignedFrequentChores.stream()
                .map(AssignedFrequentChoreDTO::valueOf).collect(Collectors.toList()));
    }

    @GetMapping("/assignedfrequents/todo")
    ResponseEntity<List<AssignedFrequentChoreDTO>> getAssignedFrequentChoresTodo() {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        List<AssignedFrequentChore> assignedFrequentChores =
                assignedFrequentChoreRepository.findByUserAssigned_UsernameAndDoneIsFalse(requestUsername);
        return ResponseEntity.ok(assignedFrequentChores.stream()
                .map(AssignedFrequentChoreDTO::valueOf).collect(Collectors.toList()));
    }

    @GetMapping("/assignedfrequents/my")
    ResponseEntity<List<AssignedFrequentChoreDTO>> getAssignedFrequentChoresMe() {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        List<AssignedFrequentChore> assignedFrequentChores =
                assignedFrequentChoreRepository.findByUserAssigned_UsernameAndReassignedIsFalse(requestUsername);
        return ResponseEntity.ok(assignedFrequentChores.stream()
                .map(AssignedFrequentChoreDTO::valueOf).collect(Collectors.toList()));
    }

    @PatchMapping("/assignedfrequent/{queueChoreId}")
    ResponseEntity setDone(@PathVariable Long queueChoreId) {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();

        AssignedFrequentChore doneChore = assignedFrequentChoreRepository.findById(queueChoreId).orElseThrow();
        if (doneChore.getDone()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Chore already done");
        }
        if (!doneChore.getUserAssigned().getUsername().equals(requestUsername)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Chore not yours");
        }
        doneChore.setDone(true);
        doneChore.setDoneDate(new Timestamp(System.currentTimeMillis()));
        AssignedFrequentChore responseChore = assignedFrequentChoreRepository.save(doneChore);

        return ResponseEntity.accepted().body(AssignedFrequentChoreDTO.valueOf(responseChore));
    }
}
