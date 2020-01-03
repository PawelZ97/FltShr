package com.zychp.backendfltshr.services;

import com.zychp.backendfltshr.dtos.chore.AssignedFrequentChoreDTO;
import com.zychp.backendfltshr.dtos.chore.FrequentChoreCDTO;
import com.zychp.backendfltshr.dtos.chore.FrequentChoreDTO;
import com.zychp.backendfltshr.dtos.user.UserNameDTO;
import com.zychp.backendfltshr.model.chore.AssignedFrequentChore;
import com.zychp.backendfltshr.model.chore.FrequentChore;
import com.zychp.backendfltshr.model.user.User;
import com.zychp.backendfltshr.repos.chore.AssignedFrequentChoreRepository;
import com.zychp.backendfltshr.repos.chore.FrequentChoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FrequetChoreService {
    private final AssignedFrequentChoreRepository assignedFrequentChoreRepository;
    private final FrequentChoreRepository frequentChoreRepository;

    @Scheduled(cron = "0 0 1 * * *") // Every day at 1.00 am
    public void cronAutoAssign() {
        List<AssignedFrequentChore> choresNotReassigned =
                assignedFrequentChoreRepository.findByReassignedIsFalseAndFrequentChore_ArchivedIsFalse();
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Europe/Paris")).withNano(0);
        for (AssignedFrequentChore readChore : choresNotReassigned) {
            LocalDateTime assignTimeDate = readChore.getAssignDate().toLocalDateTime();
            assignTimeDate = assignTimeDate.plusDays(readChore.getFrequentChore().getFrequencyDays()).minusMinutes(5);
            if (assignTimeDate.isBefore(now)) {
                readChore.setReassigned(true);
                assignedFrequentChoreRepository.save(readChore);

                AssignedFrequentChore newChore = new AssignedFrequentChore();
                newChore.setAssignedUser(readChore.getAssignedUser());
                newChore.setFrequentChore(readChore.getFrequentChore());
                newChore.setAssignDate(Timestamp.valueOf(assignTimeDate));
                newChore.setReassigned(false);
                newChore.setDone(false);
                newChore.setDoneDate(null);
                assignedFrequentChoreRepository.save(newChore);
                log.info("Reassigning chore: {}, at : {}", readChore, now);
            }
        }
    }

    public List<AssignedFrequentChoreDTO> getAssignedFrequentChores() {
        List<AssignedFrequentChore> assignedFrequentChores = (List<AssignedFrequentChore>)
                assignedFrequentChoreRepository.findAll();
        log.info("getAssignedFrequentChores()");
        return assignedFrequentChores.stream().map(AssignedFrequentChoreDTO::valueOf).collect(Collectors.toList());
    }

    public List<AssignedFrequentChoreDTO> getAssignedFrequentChoresTodo() {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        List<AssignedFrequentChore> assignedFrequentChores = assignedFrequentChoreRepository
                .findByAssignedUser_UsernameAndFrequentChore_ArchivedIsFalseAndReassignedIsFalseAndDoneIsFalse(requestUsername);
        log.info("getAssignedFrequentChoresTodo() user: {}", requestUsername);
        return assignedFrequentChores.stream().map(AssignedFrequentChoreDTO::valueOf).collect(Collectors.toList());
    }

    public List<AssignedFrequentChoreDTO> getAssignedFrequentChoresMe() {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();
        List<AssignedFrequentChore> assignedFrequentChores = assignedFrequentChoreRepository
                .findByAssignedUser_UsernameAndFrequentChore_ArchivedIsFalseAndReassignedIsFalse(requestUsername);
        log.info("getAssignedFrequentChoresMe() user: {}", requestUsername);
        return assignedFrequentChores.stream().map(AssignedFrequentChoreDTO::valueOf).collect(Collectors.toList());
    }

    public AssignedFrequentChoreDTO setDone(Long queueChoreId) {
        String requestUsername = SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal().toString();

        AssignedFrequentChore doneChore = assignedFrequentChoreRepository.findById(queueChoreId).orElseThrow();
        if (!doneChore.getAssignedUser().getUsername().equals(requestUsername)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chore not yours");
        }
        if (doneChore.getDone()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chore already done");
        }
        doneChore.setDone(true);
        doneChore.setDoneDate(new Timestamp(TimeZoneOffsetUtils.getTimeZoneWithOffset()));
        AssignedFrequentChore responseChore = assignedFrequentChoreRepository.save(doneChore);

        log.info("setDone() queueChoreId: {}", queueChoreId);
        return AssignedFrequentChoreDTO.valueOf(responseChore);
    }


    public List<FrequentChoreDTO> getFrequentChores() {
        List<FrequentChore> found = (List<FrequentChore>) frequentChoreRepository.findAll();
        log.info("getFrequentChores()");
        return found.stream().map(FrequentChoreDTO::valueOf).collect(Collectors.toList());
    }

    public FrequentChoreDTO createFrequentChore(FrequentChoreCDTO frequentChoreCDTO) {
        User userRecieved = UserNameDTO.valueOf(frequentChoreCDTO.getUser());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        Date parsed;
        try {
            parsed = dateFormat.parse(frequentChoreCDTO.getDate());
        } catch (ParseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong date format: use \"yyyy-MM-dd hh:mm:ss\"");
        }

        FrequentChore received = FrequentChoreCDTO.valueOf(frequentChoreCDTO);
        received.setArchived(false);
        FrequentChore created = frequentChoreRepository.save(received);

        AssignedFrequentChore firstCreated = new AssignedFrequentChore();
        firstCreated.setAssignedUser(userRecieved);
        firstCreated.setFrequentChore(created);
        firstCreated.setAssignDate(new Timestamp(parsed.getTime()));
        firstCreated.setReassigned(false);
        firstCreated.setDone(false);
        firstCreated.setDoneDate(null);
        assignedFrequentChoreRepository.save(firstCreated);
        log.info("setDone() frequentChoreCDTO: {}", frequentChoreCDTO);
        return FrequentChoreDTO.valueOf(created);
    }

    public FrequentChoreDTO archiveFrequentChore(Long frequentChoreId) {
        FrequentChore frequentChore = frequentChoreRepository.findById(frequentChoreId).orElseThrow();
        frequentChore.setArchived(true);
        FrequentChore archived = frequentChoreRepository.save(frequentChore);
        log.info("deleteFrequentChore() frequentChoreId: {}", frequentChoreId);
        return FrequentChoreDTO.valueOf(archived);
    }
}
