package com.zychp.backendfltshr.model.expense.expenseunequal;

import com.zychp.backendfltshr.model.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@Table(name = "expense_unequal")
public class ExpenseUnequal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "used_by", nullable = false)
    private User usedBy;

    @Column(name = "value", nullable = false, precision = 10, scale = 4)
    private BigDecimal value;

    @Column(name = "percent",  precision = 8, scale = 2)
    private BigDecimal percent;

    @Column(name = "units")
    private Long units;
}