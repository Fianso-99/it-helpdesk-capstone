package com.helpdesk.backend.repository;

import com.helpdesk.backend.entity.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    // Find tickets by status
    Page<Ticket> findByStatus(Ticket.Status status, Pageable pageable);

    // Find tickets by user
    Page<Ticket> findBySubmittedById(Long userId, Pageable pageable);

    // Find tickets by priority
    List<Ticket> findByPriority(Ticket.Priority priority);

    // Count tickets by status (for dashboard stats)
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.status = :status")
    long countByStatus(Ticket.Status status);

    // Search tickets by title
    @Query("SELECT t FROM Ticket t WHERE t.title LIKE %:keyword%")
    List<Ticket> searchByTitle(String keyword);
}
