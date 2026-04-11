package com.helpdesk.backend.service;

import com.helpdesk.backend.entity.User;
import com.helpdesk.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .name("Test User")
                .email("test@company.com")
                .password("encodedPassword")
                .role(User.Role.USER)
                .build();
    }

    // ✅ Test: Get all users successfully
    @Test
    void getAllUsers_ShouldReturnAllUsers() {
        // Arrange
        List<User> users = Arrays.asList(testUser);
        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<User> result = userService.getAllUsers();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test User", result.get(0).getName());
        verify(userRepository, times(1)).findAll();
    }

    // ✅ Test: Get user by ID successfully
    @Test
    void getUserById_WhenUserExists_ShouldReturnUser() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        // Act
        User result = userService.getUserById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Test User", result.getName());
    }

    // ❌ Test: Get user by ID - user not found
    @Test
    void getUserById_WhenUserNotExists_ShouldThrowException() {
        // Arrange
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.getUserById(99L));
        assertTrue(exception.getMessage().contains("User not found"));
    }

    // ✅ Test: Get user by email successfully
    @Test
    void getUserByEmail_WhenUserExists_ShouldReturnUser() {
        // Arrange
        when(userRepository.findByEmail("test@company.com"))
                .thenReturn(Optional.of(testUser));

        // Act
        User result = userService.getUserByEmail("test@company.com");

        // Assert
        assertNotNull(result);
        assertEquals("test@company.com", result.getEmail());
    }

    // ❌ Test: Get user by email - not found
    @Test
    void getUserByEmail_WhenUserNotExists_ShouldThrowException() {
        // Arrange
        when(userRepository.findByEmail(anyString()))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class,
                () -> userService.getUserByEmail("unknown@company.com"));
    }

    // ✅ Test: Register user successfully
    @Test
    void registerUser_WhenEmailNotExists_ShouldSaveUser() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act
        User result = userService.registerUser(testUser);

        // Assert
        assertNotNull(result);
        verify(passwordEncoder, times(1)).encode(any());
        verify(userRepository, times(1)).save(any(User.class));
    }

    // ❌ Test: Register user - email already exists
    @Test
    void registerUser_WhenEmailExists_ShouldThrowException() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.registerUser(testUser));
        assertTrue(exception.getMessage().contains("Email already in use"));
        verify(userRepository, never()).save(any());
    }

    // ✅ Test: Update user successfully
    @Test
    void updateUser_WhenUserExists_ShouldUpdateUser() {
        // Arrange
        User updatedUser = User.builder()
                .name("Updated Name")
                .email("updated@company.com")
                .build();
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act
        User result = userService.updateUser(1L, updatedUser);

        // Assert
        assertNotNull(result);
        verify(userRepository, times(1)).save(any(User.class));
    }

    // ✅ Test: Delete user successfully
    @Test
    void deleteUser_WhenUserExists_ShouldDeleteUser() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        doNothing().when(userRepository).delete(any(User.class));

        // Act
        userService.deleteUser(1L);

        // Assert
        verify(userRepository, times(1)).delete(testUser);
    }

    // ❌ Test: Delete user - not found
    @Test
    void deleteUser_WhenUserNotExists_ShouldThrowException() {
        // Arrange
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class,
                () -> userService.deleteUser(99L));
        verify(userRepository, never()).delete(any());
    }
}
