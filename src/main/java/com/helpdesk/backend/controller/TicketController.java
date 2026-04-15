package com.helpdesk.backend.controller;

import com.helpdesk.backend.dto.CreateTicketDTO;
import com.helpdesk.backend.dto.TicketDTO;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class TicketController {

    private final TicketService ticketService;

    // Get all tickets
    @GetMapping
    public ResponseEntity<Page<TicketDTO>> getAllTickets(
            @PageableDefault(size = 10, sort = "createdAt",
                    direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(
                ticketService.getAllTickets(pageable)
                        .map(TicketDTO::fromTicket));
    }

    // Get ticket by ID
    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable Long id) {
        return ResponseEntity.ok(
                TicketDTO.fromTicket(ticketService.getTicketById(id)));
    }

    // Get tickets by status
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<TicketDTO>> getByStatus(
            @PathVariable Ticket.Status status,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(
                ticketService.getTicketsByStatus(status, pageable)
                        .map(TicketDTO::fromTicket));
    }

    // Get tickets by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<TicketDTO>> getByUser(
            @PathVariable Long userId,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(
                ticketService.getTicketsByUser(userId, pageable)
                        .map(TicketDTO::fromTicket));
    }

    // Search tickets
    @GetMapping("/search")
    public ResponseEntity<List<TicketDTO>> searchTickets(
            @RequestParam String keyword) {
        List<TicketDTO> tickets = ticketService.searchTickets(keyword)
                .stream()
                .map(TicketDTO::fromTicket)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tickets);
    }

    // Create ticket
    @PostMapping("/user/{userId}")
    public ResponseEntity<TicketDTO> createTicket(
            @RequestBody CreateTicketDTO createTicketDTO,
            @PathVariable Long userId) {
        Ticket ticket = new Ticket();
        ticket.setTitle(createTicketDTO.getTitle());
        ticket.setDescription(createTicketDTO.getDescription());
        ticket.setCategory(Ticket.Category.valueOf(
                createTicketDTO.getCategory()));
        ticket.setPriority(Ticket.Priority.valueOf(
                createTicketDTO.getPriority()));
        return ResponseEntity.ok(
                TicketDTO.fromTicket(
                        ticketService.createTicket(ticket, userId)));
    }

    // Update ticket
    @PutMapping("/{id}")
    public ResponseEntity<TicketDTO> updateTicket(
            @PathVariable Long id,
            @RequestBody Ticket ticket) {
        return ResponseEntity.ok(
                TicketDTO.fromTicket(
                        ticketService.updateTicket(id, ticket)));
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