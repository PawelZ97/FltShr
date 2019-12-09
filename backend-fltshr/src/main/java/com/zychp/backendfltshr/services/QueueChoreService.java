package com.zychp.backendfltshr.services;

import com.zychp.backendfltshr.constant.TimeZoneOffset;
import com.zychp.backendfltshr.model.chore.queuechores.*;
import com.zychp.backendfltshr.model.user.User;
import com.zychp.backendfltshr.model.user.UserNameDTO;
import com.zychp.backendfltshr.repos.UserRepository;
import com.zychp.backendfltshr.repos.chore.AssignedQueueChoreRepository;
import com.zychp.backendfltshr.repos.chore.QueueChoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class QueueChoreService {
    private final AssignedQueueChoreRepository assignedQueueChoreRepository;
    private final QueueChoreRepository queueChoreRepository;
    private final UserRepository userRepository;

    public List<AssignedQueueChoreDTO> getAssignedQueueChores() {
        List<AssignedQueueChore> assignedQueueChores =
                (List<AssignedQueueChore>) assignedQueueChoreRepository.findAll();
        log.info("getAssignedQueueChores()");
        return assignedQueueChores.stream().map(AssignedQueueChoreDTO::valueOf).collect(Collectors.toList());
    }

    public List<AssignedQueueChoreDTO> getAssignedQueueChoresMe() {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        List<AssignedQueueChore> assignedQueueChores = assignedQueueChoreRepository
                .findByAssignedUser_UsernameAndAndDoneIsFalseAndQueueChore_ArchivedIsFalse(requestUsername);
        log.info("getAssignedQueueChoresMe() user: {}", requestUsername);
        return assignedQueueChores.stream().map(AssignedQueueChoreDTO::valueOf).collect(Collectors.toList());
    }

    public AssignedQueueChoreDTO setDone(Long queueChoreId) {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();

        AssignedQueueChore doneChore = assignedQueueChoreRepository.findById(queueChoreId).orElseThrow();
        if (!doneChore.getAssignedUser().getUsername().equals(requestUsername)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chore not yours");
        }
        if (doneChore.getDone()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chore already done");
        }
        doneChore.setDone(true);
        doneChore.setDoneDate(new Timestamp(TimeZoneOffset.getTimeZoneWithOffset()));
        AssignedQueueChore responseChore = assignedQueueChoreRepository.save(doneChore);

        AssignedQueueChore autoAssign = new AssignedQueueChore();
        autoAssign.setDone(false);
        autoAssign.setQueueChore(doneChore.getQueueChore());

        Long newUserId = (doneChore.getAssignedUser().getId() - 2) % (userRepository.count() - 2) + 3;
        autoAssign.setAssignedUser(userRepository.findById(newUserId).orElseThrow());

        assignedQueueChoreRepository.save(autoAssign);
        log.info("setDone() queueChoreId: {}", queueChoreId);
        return AssignedQueueChoreDTO.valueOf(responseChore);
    }


    public List<QueueChoreDTO> getQueueChores() {
        List<QueueChore> found = (List<QueueChore>) queueChoreRepository.findAll();
        log.info("getQueueChores()");
        return found.stream().map(QueueChoreDTO::valueOf).collect(Collectors.toList());
    }

    public QueueChoreDTO createQueueChore(QueueChoreCDTO queueChoreCDTO) {
        User firstUser = UserNameDTO.valueOf(queueChoreCDTO.getFirstUser());
        QueueChore received = QueueChoreCDTO.valueOf(queueChoreCDTO);
        received.setArchived(false);
        QueueChore created = queueChoreRepository.save(received);

        AssignedQueueChore firstCreated = new AssignedQueueChore();
        firstCreated.setQueueChore(created);
        firstCreated.setDone(false);
        firstCreated.setAssignedUser(firstUser);
        assignedQueueChoreRepository.save(firstCreated);

        log.info("createQueueChore() queueChoreCDTO: {}", queueChoreCDTO);
        return QueueChoreDTO.valueOf(created);
    }


    public void archiveQueueChore(Long queueChoreId) {
        QueueChore queueChore = queueChoreRepository.findById(queueChoreId).orElseThrow();
        queueChore.setArchived(true);
        queueChoreRepository.save(queueChore);
        log.info("deleteQueueChore() queueChoreId: {}", queueChoreId);
    }
}
