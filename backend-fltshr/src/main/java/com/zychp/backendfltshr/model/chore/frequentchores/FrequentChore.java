package com.zychp.backendfltshr.model.chore.frequentchores;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "frequent_chores")
public class FrequentChore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "archived", nullable = false)
    private Boolean archived;

    @Column(name = "duration_days", nullable = false)
    private Long durationDays;

    @Column(name = "frequency_days", nullable = false)
    private Long frequencyDays;
}
