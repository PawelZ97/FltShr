package com.zychp.backendfltshr.domain.chores.frequentchores;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AssignedFrequentChoreRepository extends CrudRepository<AssignedFrequentChore, Long> {
    List<AssignedFrequentChore> findByUserAssigned_UsernameAndDoneIsFalse(String username);
    List<AssignedFrequentChore> findByUserAssigned_UsernameAndReassignedIsFalse(String username);
}
