package com.zychp.backendfltshr.repos.chore;

import com.zychp.backendfltshr.model.chore.AssignedFrequentChore;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AssignedFrequentChoreRepository extends CrudRepository<AssignedFrequentChore, Long> {
    List<AssignedFrequentChore> findByAssignedUser_UsernameAndFrequentChore_ArchivedIsFalseAndReassignedIsFalseAndDoneIsFalse(String username);
    List<AssignedFrequentChore> findByAssignedUser_UsernameAndFrequentChore_ArchivedIsFalseAndReassignedIsFalse(String username);
    List<AssignedFrequentChore> findByReassignedIsFalseAndFrequentChore_ArchivedIsFalse();
}
