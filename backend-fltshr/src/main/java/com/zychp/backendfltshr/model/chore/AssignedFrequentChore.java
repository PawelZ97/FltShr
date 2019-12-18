package com.zychp.backendfltshr.model.chore;

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
@Table(name = "assigned_frequent_chore")
public class AssignedFrequentChore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assigned_user", nullable = false)
    private User assignedUser;

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