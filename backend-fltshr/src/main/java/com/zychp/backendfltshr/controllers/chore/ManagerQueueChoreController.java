package com.zychp.backendfltshr.controllers.chore;

import com.zychp.backendfltshr.repos.chore.AssignedQueueChoreRepository;
import com.zychp.backendfltshr.repos.chore.QueueChoreRepository;
import com.zychp.backendfltshr.model.chore.queuechores.*;
import com.zychp.backendfltshr.model.user.User;
import com.zychp.backendfltshr.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "manager/chores")
@RequiredArgsConstructor
public class ManagerQueueChoreController {
    private final QueueChoreRepository queueChoreRepository;
    private final AssignedQueueChoreRepository assignedQueueChoreRepository;
    private final UserRepository userRepository;

    @GetMapping("/queuechores")
    ResponseEntity getQueueChores() {
        List<QueueChore> found = (List<QueueChore>) queueChoreRepository.findAll();
        return ResponseEntity.ok(found.stream().map(QueueChoreDTO::valueOf).collect(Collectors.toList()));
    }

    @PostMapping("/queuechore/user/{userId}")
    ResponseEntity<QueueChoreDTO> createQueueChore(@PathVariable Long userId,
                                                   @RequestBody QueueChoreCDTO queueChoreCDTO) {
        QueueChore received = QueueChoreCDTO.valueOf(queueChoreCDTO);
        QueueChore created = queueChoreRepository.save(received);

        User user = userRepository.findById(userId).orElseThrow();

        AssignedQueueChore firstCreated = new AssignedQueueChore();
        firstCreated.setQueueChore(created);
        firstCreated.setDone(false);
        firstCreated.setAssignedUser(user);
        assignedQueueChoreRepository.save(firstCreated);

        return ResponseEntity.accepted().body(QueueChoreDTO.valueOf(created));

    }

    @DeleteMapping("/queuechore/{queueChoreId}")
    ResponseEntity deleteQueueChore(@PathVariable Long queueChoreId) {
        //TODO Fix delete when queueChore assigned (relation inversion)
        queueChoreRepository.deleteById(queueChoreId);
        return ResponseEntity.accepted().build();
    }
}
