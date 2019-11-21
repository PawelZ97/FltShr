package com.zychp.backendfltshr.repos.chore;

import com.zychp.backendfltshr.model.chore.queuechores.QueueChore;
import org.springframework.data.repository.CrudRepository;

public interface QueueChoreRepository extends CrudRepository<QueueChore, Long> {
}
