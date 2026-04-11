package com.helpdesk.backend.controller;

import com.helpdesk.backend.entity.Ticket;
import com.helpdesk.backend.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    private final TicketService ticketService;

    // Get all tickets
    @GetMapping
    public ResponseEntity<Page<Ticket>> getAllTickets(
            @PageableDefault(size = 10, sort = "createdAt",
                    direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(ticketService.getAllTickets(pageable));
    }

    // Get ticket by ID
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    // Get tickets by status
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<Ticket>> getByStatus(
            @PathVariable Ticket.Status status,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(ticketService.getTicketsByStatus(status, pageable));
    }

    // Get tickets by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Ticket>> getByUser(
            @PathVariable Long userId,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(ticketService.getTicketsByUser(userId, pageable));
    }

    // Search tickets
    @GetMapping("/search")
    public ResponseEntity<List<Ticket>> searchTickets(@RequestParam String keyword) {
        return ResponseEntity.ok(ticketService.searchTickets(keyword));
    }

    // Create ticket
    @PostMapping("/user/{userId}")
    public ResponseEntity<Ticket> createTicket(
            @RequestBody Ticket ticket,
            @PathVariable Long userId) {
        return ResponseEntity.ok(ticketService.createTicket(ticket, userId));
    }

    // Update ticket
    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(
            @PathVariable Long id,
            @RequestBody Ticket ticket) {
        return ResponseEntity.ok(ticketService.updateTicket(id, ticket));
    }

    // Delete ticket
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.ok("Ticket deleted successfully");
    }

    // Dashboard stats
    @GetMapping("/dashboard/stats")
    public ResponseEntity<TicketService.DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(ticketService.getDashboardStats());
    }
}