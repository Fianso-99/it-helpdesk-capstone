
package com.helpdesk.backend.dto;

import com.helpdesk.backend.entity.Ticket;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketDTO {

    private Long id;
    private String title;
    private String description;
    private String category;
    private String priority;
    private String status;
    private String submittedByName;
    private String submittedByEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static TicketDTO fromTicket(Ticket ticket) {
        return TicketDTO.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .description(ticket.getDescription())
                .category(ticket.getCategory().name())
                .priority(ticket.getPriority().name())
                .status(ticket.getStatus().name())
                .submittedByName(ticket.getSubmittedBy() != null ?
                        ticket.getSubmittedBy().getName() : null)
                .submittedByEmail(ticket.getSubmittedBy() != null ?
                        ticket.getSubmittedBy().getEmail() : null)
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .build();
    }
}