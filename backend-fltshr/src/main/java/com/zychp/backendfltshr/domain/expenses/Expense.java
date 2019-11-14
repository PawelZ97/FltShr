package com.zychp.backendfltshr.domain.expenses;

import com.zychp.backendfltshr.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

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

    @Column(name = "bought_date")
    private Timestamp boughtDate;

    @Column(name = "description")
    private String description;
}