package com.helpdesk.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTicketDTO {

    private String title;
    private String description;
    private String category;
    private String priority;
}