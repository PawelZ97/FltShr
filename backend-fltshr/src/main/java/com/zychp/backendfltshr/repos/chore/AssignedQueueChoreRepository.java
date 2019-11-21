package com.zychp.backendfltshr.repos.chore;

import com.zychp.backendfltshr.model.chore.queuechores.AssignedQueueChore;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AssignedQueueChoreRepository extends CrudRepository<AssignedQueueChore, Long> {
    List<AssignedQueueChore> findByAssignedUser_UsernameAndAndDoneIsFalse(String Username);
}
