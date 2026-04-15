package com.helpdesk.backend.dto;

import com.helpdesk.backend.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {

    private Long id;
    private String content;
    private String authorName;
    private String authorEmail;
    private Long ticketId;
    private LocalDateTime createdAt;

    public static CommentDTO fromComment(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .authorName(comment.getAuthor() != null ?
                        comment.getAuthor().getName() : null)
                .authorEmail(comment.getAuthor() != null ?
                        comment.getAuthor().getEmail() : null)
                .ticketId(comment.getTicket() != null ?
                        comment.getTicket().getId() : null)
                .createdAt(comment.getCreatedAt())
                .build();
    }
}