package com.zychp.backendfltshr.domain.chores.queuechores;

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
@Table(name = "assigned_queue_chore")
public class AssignedQueueChore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assigned_user", nullable = false)
    private User assignedUser;

    @ManyToOne
    @JoinColumn(name = "chore", nullable = false)
    private QueueChore queueChore;

    @CreationTimestamp
    @Column(name = "assign_date")
    private Timestamp assignDate;

    @Column(name = "done")
    private Boolean done;

    @Column(name = "done_date")
    private Timestamp doneDate;
}
