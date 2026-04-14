package com.helpdesk.backend.service;

import com.helpdesk.backend.entity.Ticket;
import com.helpdesk.backend.entity.User;
import com.helpdesk.backend.exception.ResourceNotFoundException;
import com.helpdesk.backend.repository.TicketRepository;
import com.helpdesk.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    // Get all tickets
    public Page<Ticket> getAllTickets(Pageable pageable) {
        return ticketRepository.findAll(pageable);
    }

    // Get ticket by ID
    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket", id));
    }

    // Get tickets by status
    public Page<Ticket> getTicketsByStatus(Ticket.Status status, Pageable pageable) {
        return ticketRepository.findByStatus(status, pageable);
    }

    // Get tickets by user
    public Page<Ticket> getTicketsByUser(Long userId, Pageable pageable) {
        return ticketRepository.findBySubmittedById(userId, pageable);
    }

    // Search tickets
    public List<Ticket> searchTickets(String keyword) {
        return ticketRepository.searchByTitle(keyword);
    }

    // Create new ticket
    @Transactional
    public Ticket createTicket(Ticket ticket, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        ticket.setSubmittedBy(user);
        ticket.setStatus(Ticket.Status.OPEN);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());
        return ticketRepository.save(ticket);
    }

    // Update ticket
    @Transactional
    public Ticket updateTicket(Long id, Ticket updatedTicket) {
        Ticket ticket = getTicketById(id);
        ticket.setTitle(updatedTicket.getTitle());
        ticket.setDescription(updatedTicket.getDescription());
        ticket.setCategory(updatedTicket.getCategory());
        ticket.setPriority(updatedTicket.getPriority());
        ticket.setStatus(updatedTicket.getStatus());
        ticket.setUpdatedAt(LocalDateTime.now());
        return ticketRepository.save(ticket);
    }

    // Delete ticket
    @Transactional
    public void deleteTicket(Long id) {
        Ticket ticket = getTicketById(id);
        ticketRepository.delete(ticket);
    }

    // Dashboard stats
    public DashboardStats getDashboardStats() {
        long total = ticketRepository.count();
        long open = ticketRepository.countByStatus(Ticket.Status.OPEN);
        long inProgress = ticketRepository.countByStatus(Ticket.Status.IN_PROGRESS);
        long resolved = ticketRepository.countByStatus(Ticket.Status.RESOLVED);
        return new DashboardStats(total, open, inProgress, resolved);
    }

    // Dashboard stats record
    public record DashboardStats(
            long total,
            long open,
            long inProgress,
            long resolved
    ) {}
}