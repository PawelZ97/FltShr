package com.zychp.backendfltshr.model.expense.expense;

import com.zychp.backendfltshr.model.expense.expenselist.ExpenseList;
import com.zychp.backendfltshr.model.expense.expenseunequal.ExpenseUnequal;
import com.zychp.backendfltshr.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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

    @Column(name = "total", nullable = false)
    private BigDecimal total;

    @Column(name = "is_equal", nullable = false)
    private Boolean isEqual;

    @ManyToOne
    @JoinColumn(name = "list", nullable = false)
    private ExpenseList expenseList;

    @ManyToOne
    @JoinColumn(name = "paid_by", nullable = false)
    private User paidBy;

    @CreationTimestamp
    @Column(name = "bought_date")
    private Timestamp boughtDate;

    @Column(name = "description")
    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "expense", nullable = false)
    private Set<ExpenseUnequal> expenseUnequals;
}