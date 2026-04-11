package com.helpdesk.backend.controller;

import com.helpdesk.backend.entity.Comment;
import com.helpdesk.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets/{ticketId}/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<Comment>> getComments(
            @PathVariable Long ticketId) {
        return ResponseEntity.ok(
                commentService.getCommentsByTicket(ticketId));
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(
            @PathVariable Long ticketId,
            @RequestBody Map<String, String> request) {
        Long userId = Long.parseLong(request.get("userId"));
        String content = request.get("content");
        return ResponseEntity.ok(
                commentService.addComment(ticketId, userId, content));
    }
}