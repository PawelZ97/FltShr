package com.zychp.backendfltshr.controllers.chore;

import com.zychp.backendfltshr.dtos.chore.AssignedQueueChoreDTO;
import com.zychp.backendfltshr.services.QueueChoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/chores")
@RequiredArgsConstructor
public class QueueChoreController {
    private final QueueChoreService queueChoreService;

    @GetMapping("/assignedqueues")
    ResponseEntity<List<AssignedQueueChoreDTO>> getAssignedQueueChores() {
        return ResponseEntity.ok(queueChoreService.getAssignedQueueChores());
    }

    @GetMapping("/assignedqueues/me")
    ResponseEntity<List<AssignedQueueChoreDTO>> getAssignedQueueChoresMe() {
        return ResponseEntity.ok(queueChoreService.getAssignedQueueChoresMe());
    }

    @PatchMapping("/assignedqueue/{queueChoreId}")
    ResponseEntity setDone(@PathVariable Long queueChoreId) {
        return ResponseEntity.accepted().body(queueChoreService.setDone(queueChoreId));
    }
}
