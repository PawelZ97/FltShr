package com.zychp.backendfltshr.controllers.chore;

import com.zychp.backendfltshr.dtos.chore.AssignedFrequentChoreDTO;
import com.zychp.backendfltshr.services.FrequetChoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/chores")
@RequiredArgsConstructor
public class FrequentChoreController {
    private final FrequetChoreService frequetChoreService;


    @GetMapping("/assignedfrequents")
    ResponseEntity<List<AssignedFrequentChoreDTO>> getAssignedFrequentChores() {
        return ResponseEntity.ok(frequetChoreService.getAssignedFrequentChores());
    }

    @GetMapping("/assignedfrequents/todo")
    ResponseEntity<List<AssignedFrequentChoreDTO>> getAssignedFrequentChoresTodo() {
        return ResponseEntity.ok(frequetChoreService.getAssignedFrequentChoresTodo());
    }

    @GetMapping("/assignedfrequents/my")
    ResponseEntity<List<AssignedFrequentChoreDTO>> getAssignedFrequentChoresMe() {
        return ResponseEntity.ok(frequetChoreService.getAssignedFrequentChoresMe());
    }

    @PatchMapping("/assignedfrequent/{queueChoreId}")
    ResponseEntity setDone(@PathVariable Long queueChoreId) {
        return ResponseEntity.accepted().body(frequetChoreService.setDone(queueChoreId));
    }
}
