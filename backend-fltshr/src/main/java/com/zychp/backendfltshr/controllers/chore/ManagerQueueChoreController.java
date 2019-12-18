package com.zychp.backendfltshr.controllers.chore;

import com.zychp.backendfltshr.dtos.chore.QueueChoreCDTO;
import com.zychp.backendfltshr.dtos.chore.QueueChoreDTO;
import com.zychp.backendfltshr.services.QueueChoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "manager/chores")
@RequiredArgsConstructor
public class ManagerQueueChoreController {
    private final QueueChoreService queueChoreService;

    @GetMapping("/queuechores")
    ResponseEntity getQueueChores() {
        return ResponseEntity.ok(queueChoreService.getQueueChores());
    }

    @PostMapping("/queuechore")
    ResponseEntity<QueueChoreDTO> createQueueChore(@RequestBody QueueChoreCDTO queueChoreCDTO) {
        return ResponseEntity.accepted().body(queueChoreService.createQueueChore(queueChoreCDTO));
    }

    @DeleteMapping("/queuechore/{queueChoreId}/archive")
    ResponseEntity archiveQueueChore(@PathVariable Long queueChoreId) {
        queueChoreService.archiveQueueChore(queueChoreId);
        return ResponseEntity.accepted().build();
    }
}
