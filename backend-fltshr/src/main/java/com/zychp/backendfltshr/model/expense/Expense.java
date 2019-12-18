package com.zychp.backendfltshr.model.expense;

import com.zychp.backendfltshr.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(name = "unequal_type")
    private String unequalType;

    @ManyToOne
    @JoinColumn(name = "list", nullable = false)
    private ExpenseList expenseList;

    @ManyToOne
    @JoinColumn(name = "paid_by", nullable = false)
    private User paidBy;

    @Column(name = "bought_date")
    private Timestamp boughtDate;

    @Column(name = "description")
    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "expense", nullable = false)
    private Set<ExpenseUnequal> expenseUnequals;
}