package com.helpdesk.backend.service;

import com.helpdesk.backend.entity.Ticket;
import com.helpdesk.backend.entity.User;
import com.helpdesk.backend.repository.TicketRepository;
import com.helpdesk.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TicketService ticketService;

    private Ticket testTicket;
    private User testUser;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .name("Test User")
                .email("test@company.com")
                .role(User.Role.USER)
                .build();

        testTicket = Ticket.builder()
                .id(1L)
                .title("Test Ticket")
                .description("Test Description")
                .category(Ticket.Category.HARDWARE)
                .priority(Ticket.Priority.HIGH)
                .status(Ticket.Status.OPEN)
                .submittedBy(testUser)
                .build();

        pageable = PageRequest.of(0, 10);
    }

    // ✅ Test: Get all tickets
    @Test
    void getAllTickets_ShouldReturnAllTickets() {
        // Arrange
        Page<Ticket> ticketPage = new PageImpl<>(Arrays.asList(testTicket));
        when(ticketRepository.findAll(pageable)).thenReturn(ticketPage);

        // Act
        Page<Ticket> result = ticketService.getAllTickets(pageable);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(ticketRepository, times(1)).findAll(pageable);
    }

    // ✅ Test: Get ticket by ID
    @Test
    void getTicketById_WhenExists_ShouldReturnTicket() {
        // Arrange
        when(ticketRepository.findById(1L))
                .thenReturn(Optional.of(testTicket));

        // Act
        Ticket result = ticketService.getTicketById(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Test Ticket", result.getTitle());
        assertEquals(Ticket.Status.OPEN, result.getStatus());
    }

    // ❌ Test: Get ticket by ID - not found
    @Test
    void getTicketById_WhenNotExists_ShouldThrowException() {
        // Arrange
        when(ticketRepository.findById(99L))
                .thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> ticketService.getTicketById(99L));
        assertTrue(exception.getMessage().contains("Ticket not found"));
    }

    // ✅ Test: Create ticket successfully
    @Test
    void createTicket_WhenUserExists_ShouldCreateTicket() {
        // Arrange
        when(userRepository.findById(1L))
                .thenReturn(Optional.of(testUser));
        when(ticketRepository.save(any(Ticket.class)))
                .thenReturn(testTicket);

        // Act
        Ticket result = ticketService.createTicket(testTicket, 1L);

        // Assert
        assertNotNull(result);
        assertEquals(Ticket.Status.OPEN, result.getStatus());
        verify(ticketRepository, times(1)).save(any(Ticket.class));
    }

    // ❌ Test: Create ticket - user not found
    @Test
    void createTicket_WhenUserNotExists_ShouldThrowException() {
        // Arrange
        when(userRepository.findById(99L))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class,
                () -> ticketService.createTicket(testTicket, 99L));
        verify(ticketRepository, never()).save(any());
    }

    // ✅ Test: Update ticket successfully
    @Test
    void updateTicket_WhenExists_ShouldUpdateTicket() {
        // Arrange
        Ticket updatedTicket = Ticket.builder()
                .title("Updated Title")
                .description("Updated Description")
                .category(Ticket.Category.SOFTWARE)
                .priority(Ticket.Priority.MEDIUM)
                .status(Ticket.Status.IN_PROGRESS)
                .build();

        when(ticketRepository.findById(1L))
                .thenReturn(Optional.of(testTicket));
        when(ticketRepository.save(any(Ticket.class)))
                .thenReturn(testTicket);

        // Act
        Ticket result = ticketService.updateTicket(1L, updatedTicket);

        // Assert
        assertNotNull(result);
        verify(ticketRepository, times(1)).save(any(Ticket.class));
    }

    // ❌ Test: Update ticket - not found
    @Test
    void updateTicket_WhenNotExists_ShouldThrowException() {
        // Arrange
        when(ticketRepository.findById(99L))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class,
                () -> ticketService.updateTicket(99L, testTicket));
    }

    // ✅ Test: Delete ticket successfully
    @Test
    void deleteTicket_WhenExists_ShouldDeleteTicket() {
        // Arrange
        when(ticketRepository.findById(1L))
                .thenReturn(Optional.of(testTicket));
        doNothing().when(ticketRepository).delete(any(Ticket.class));

        // Act
        ticketService.deleteTicket(1L);

        // Assert
        verify(ticketRepository, times(1)).delete(testTicket);
    }

    // ❌ Test: Delete ticket - not found
    @Test
    void deleteTicket_WhenNotExists_ShouldThrowException() {
        // Arrange
        when(ticketRepository.findById(99L))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class,
                () -> ticketService.deleteTicket(99L));
        verify(ticketRepository, never()).delete(any());
    }

    // ✅ Test: Dashboard stats
    @Test
    void getDashboardStats_ShouldReturnCorrectStats() {
        // Arrange
        when(ticketRepository.count()).thenReturn(5L);
        when(ticketRepository.countByStatus(Ticket.Status.OPEN)).thenReturn(2L);
        when(ticketRepository.countByStatus(Ticket.Status.IN_PROGRESS)).thenReturn(2L);
        when(ticketRepository.countByStatus(Ticket.Status.RESOLVED)).thenReturn(1L);

        // Act
        TicketService.DashboardStats stats = ticketService.getDashboardStats();

        // Assert
        assertNotNull(stats);
        assertEquals(5L, stats.total());
        assertEquals(2L, stats.open());
        assertEquals(2L, stats.inProgress());
        assertEquals(1L, stats.resolved());
    }
}
