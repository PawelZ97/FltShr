package com.zychp.backendfltshr.model.chore.frequentchores;

import com.zychp.backendfltshr.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "assigned_frequent_chores")
public class AssignedFrequentChore {
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

    @Column(name = "assign_date")
    private Timestamp assignDate;

    @Column(name = "reassigned")
    private Boolean reassigned;

    @Column(name = "done")
    private Boolean done;

    @Column(name = "done_date")
    private Timestamp doneDate;
}