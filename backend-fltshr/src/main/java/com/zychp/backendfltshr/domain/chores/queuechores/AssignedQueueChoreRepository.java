package com.zychp.backendfltshr.domain.chores.queuechores;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AssignedQueueChoreRepository extends CrudRepository<AssignedQueueChore, Long> {
    List<AssignedQueueChore> findByAssignedUser_UsernameAndAndDoneIsFalse(String Username);
}
