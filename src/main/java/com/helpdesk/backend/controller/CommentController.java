package com.helpdesk.backend.controller;

import com.helpdesk.backend.dto.CommentDTO;
import com.helpdesk.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets/{ticketId}/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getComments(
            @PathVariable Long ticketId) {
        List<CommentDTO> comments = commentService
                .getCommentsByTicket(ticketId)
                .stream()
                .map(CommentDTO::fromComment)
                .collect(Collectors.toList());
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<CommentDTO> addComment(
            @PathVariable Long ticketId,
            @RequestBody Map<String, String> request) {
        Long userId = Long.parseLong(request.get("userId"));
        String content = request.get("content");
        return ResponseEntity.ok(
                CommentDTO.fromComment(
                        commentService.addComment(ticketId, userId, content)));
    }
}