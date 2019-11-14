package com.zychp.backendfltshr.domain.expenses;

import com.zychp.backendfltshr.domain.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "expense_usages")
public class ExpenseUnequal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "used_by", nullable = false)
    private User usedBy;

    @ManyToOne
    @JoinColumn(name = "expense", nullable = false)
    private Expense expense;

    @Column(name = "percent")
    private Long percent;

    @Column(name = "units")
    private Long units;
}