package com.zychp.backendfltshr.domain.chores;

import com.zychp.backendfltshr.domain.chores.queuechores.QueueChore;
import com.zychp.backendfltshr.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "assigned_frequent_chores")
public class FrequentChoreAssigned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_assigned", nullable = false)
    private User userAssigned;

    @ManyToOne
    @JoinColumn(name = "frequent_chore", nullable = false)
    private FrequentChore frequentChore;

    @CreationTimestamp
    @Column(name = "assign_date")
    private Timestamp assignDate;

    @Column(name = "done")
    private Boolean done;

    @Column(name = "done_date")
    private Timestamp doneDate;
}