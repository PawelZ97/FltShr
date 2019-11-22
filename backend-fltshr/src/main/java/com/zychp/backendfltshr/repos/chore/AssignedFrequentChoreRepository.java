package com.zychp.backendfltshr.repos.chore;

import com.zychp.backendfltshr.model.chore.frequentchores.AssignedFrequentChore;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AssignedFrequentChoreRepository extends CrudRepository<AssignedFrequentChore, Long> {
    List<AssignedFrequentChore> findByUserAssigned_UsernameAndFrequentChore_ArchivedIsFalseAndDoneIsFalse(String username);
    List<AssignedFrequentChore> findByUserAssigned_UsernameAndFrequentChore_ArchivedIsFalseAndReassignedIsFalse(String username);
    List<AssignedFrequentChore> findByReassignedIsFalseAndFrequentChore_ArchivedIsFalse();
}
