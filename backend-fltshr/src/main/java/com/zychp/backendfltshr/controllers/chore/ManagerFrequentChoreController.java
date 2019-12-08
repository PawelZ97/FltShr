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

    @PostMapping("/frequentchore")
    ResponseEntity<FrequentChoreDTO> createFrequentChore(@RequestBody FrequentChoreCDTO frequentChoreCDTO) {
        return ResponseEntity.accepted().body(
                frequetChoreService.createFrequentChore(frequentChoreCDTO));
    }

    @DeleteMapping("/frequentchore/{frequentChoreId}/archive")
    ResponseEntity<FrequentChoreDTO> archiveFrequentChore(@PathVariable Long frequentChoreId) {
        return ResponseEntity.accepted().body(frequetChoreService.archiveFrequentChore(frequentChoreId));
    }
}
