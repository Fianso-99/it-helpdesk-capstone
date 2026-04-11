package com.helpdesk.backend.service;

import com.helpdesk.backend.entity.Comment;
import com.helpdesk.backend.entity.Ticket;
import com.helpdesk.backend.entity.User;
import com.helpdesk.backend.repository.CommentRepository;
import com.helpdesk.backend.repository.TicketRepository;
import com.helpdesk.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public List<Comment> getCommentsByTicket(Long ticketId) {
        return commentRepository.findByTicketIdOrderByCreatedAtAsc(ticketId);
    }

    @Transactional
    public Comment addComment(Long ticketId, Long userId, String content) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = Comment.builder()
                .content(content)
                .ticket(ticket)
                .author(user)
                .build();

        return commentRepository.save(comment);
    }
}