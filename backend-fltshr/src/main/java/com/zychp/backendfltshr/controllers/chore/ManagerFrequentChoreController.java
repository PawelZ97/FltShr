package com.zychp.backendfltshr.controllers.chore;

import com.zychp.backendfltshr.repos.chore.FrequentChoreRepository;
import com.zychp.backendfltshr.repos.chore.AssignedFrequentChoreRepository;
import com.zychp.backendfltshr.model.chore.frequentchores.*;
import com.zychp.backendfltshr.model.user.User;
import com.zychp.backendfltshr.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "manager/chores")
@RequiredArgsConstructor
public class ManagerFrequentChoreController {
    private final FrequentChoreRepository frequentChoreRepository;
    private final AssignedFrequentChoreRepository assignedFrequentChoreRepository;
    private final UserRepository userRepository;

    @GetMapping("/frequentchores")
    ResponseEntity getFrequentChores() {
        List<FrequentChore> found = (List<FrequentChore>) frequentChoreRepository.findAll();
        return ResponseEntity.ok(found.stream().map(FrequentChoreDTO::valueOf).collect(Collectors.toList()));
    }

    @PostMapping("/frequentchore/user/{userId}/date/{dateFirstAssign}")
    ResponseEntity<FrequentChoreDTO> createFrequentChore(@PathVariable Long userId,
                                                         @PathVariable String dateFirstAssign,
                                                         @RequestBody FrequentChoreCDTO frequentChoreCDTO) {
        User userRecieved = userRepository.findById(userId).orElseThrow();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date parsed;
        try {
            parsed = dateFormat.parse(dateFirstAssign);
        } catch (ParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new FrequentChoreDTO());
        }

        FrequentChore received = FrequentChoreCDTO.valueOf(frequentChoreCDTO);
        received.setActive(true);
        FrequentChore created = frequentChoreRepository.save(received);

        AssignedFrequentChore firstCreated = new AssignedFrequentChore();
        firstCreated.setUserAssigned(userRecieved);
        firstCreated.setFrequentChore(created);
        firstCreated.setAssignDate(new Timestamp(parsed.getTime()));
        firstCreated.setReassigned(false);
        firstCreated.setDone(false);
        firstCreated.setDoneDate(null);
        assignedFrequentChoreRepository.save(firstCreated);
        return ResponseEntity.accepted().body(FrequentChoreDTO.valueOf(created));
    }

    @DeleteMapping("/frequentchore/archive/{frequentChoreId}")
    ResponseEntity<FrequentChoreDTO> deleteFrequentChore(@PathVariable Long frequentChoreId) {
        FrequentChore frequentChore = frequentChoreRepository.findById(frequentChoreId).orElseThrow();
        frequentChore.setActive(false);
        FrequentChore archived = frequentChoreRepository.save(frequentChore);
        return ResponseEntity.accepted().body(FrequentChoreDTO.valueOf(archived));
    }
}
