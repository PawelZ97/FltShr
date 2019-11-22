package com.zychp.backendfltshr.controllers.chore;

import com.zychp.backendfltshr.model.chore.frequentchores.FrequentChoreCDTO;
import com.zychp.backendfltshr.model.chore.frequentchores.FrequentChoreDTO;
import com.zychp.backendfltshr.services.FrequetChoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "manager/chores")
@RequiredArgsConstructor
public class ManagerFrequentChoreController {
    private final FrequetChoreService frequetChoreService;


    @GetMapping("/frequentchores")
    ResponseEntity<List<FrequentChoreDTO>> getFrequentChores() {
        return ResponseEntity.ok(frequetChoreService.getFrequentChores());
    }

    @PostMapping("/frequentchore/user/{userId}/date/{dateFirstAssign}")
    ResponseEntity<FrequentChoreDTO> createFrequentChore(@PathVariable Long userId,
                                                         @PathVariable String dateFirstAssign,
                                                         @RequestBody FrequentChoreCDTO frequentChoreCDTO) {
        return ResponseEntity.accepted().body(
                frequetChoreService.createFrequentChore(userId, dateFirstAssign, frequentChoreCDTO));
    }

    @DeleteMapping("/frequentchore/{frequentChoreId}/archive")
    ResponseEntity<FrequentChoreDTO> archiveFrequentChore(@PathVariable Long frequentChoreId) {
        return ResponseEntity.accepted().body(frequetChoreService.archiveFrequentChore(frequentChoreId));
    }
}
