package com.zychp.backendfltshr.controllers.chore;

import com.zychp.backendfltshr.model.chore.queuechores.QueueChoreCDTO;
import com.zychp.backendfltshr.model.chore.queuechores.QueueChoreDTO;
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

    @PostMapping("/queuechore/user/{userId}")
    ResponseEntity<QueueChoreDTO> createQueueChore(@PathVariable Long userId,
                                                   @RequestBody QueueChoreCDTO queueChoreCDTO) {
        return ResponseEntity.accepted().body(queueChoreService.createQueueChore(userId, queueChoreCDTO));
    }

    @DeleteMapping("/queuechore/{queueChoreId}")
    ResponseEntity deleteQueueChore(@PathVariable Long queueChoreId) {
        queueChoreService.deleteQueueChore(queueChoreId);
        return ResponseEntity.accepted().build();
    }
}
