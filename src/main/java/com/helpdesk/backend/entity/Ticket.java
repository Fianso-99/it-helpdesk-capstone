package com.helpdesk.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority = Priority.MEDIUM;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.OPEN;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User submittedBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Delete comments automatically when ticket is deleted
    @OneToMany(mappedBy = "ticket",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Comment> comments;

    public enum Category {
        HARDWARE,
        SOFTWARE,
        NETWORK,
        EMAIL,
        OTHER
    }

    public enum Priority {
        LOW,
        MEDIUM,
        HIGH,
        CRITICAL
    }

    public enum Status {
        OPEN,
        IN_PROGRESS,
        RESOLVED,
        CLOSED
    }
}