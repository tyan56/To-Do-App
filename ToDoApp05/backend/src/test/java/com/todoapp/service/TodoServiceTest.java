package com.todoapp.service;

import com.todoapp.dto.TodoRequest;
import com.todoapp.dto.TodoUpdateRequest;
import com.todoapp.entity.Todo;
import com.todoapp.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {
    
    @Mock
    private TodoRepository todoRepository;
    
    @InjectMocks
    private TodoService todoService;
    
    private Todo testTodo;
    private TodoRequest todoRequest;
    private TodoUpdateRequest todoUpdateRequest;
    
    @BeforeEach
    void setUp() {
        testTodo = new Todo();
        testTodo.setId(1L);
        testTodo.setTitle("Test Todo");
        testTodo.setDescription("Test Description");
        testTodo.setCompleted(false);
        testTodo.setPriority(1);
        testTodo.setDueDate(LocalDateTime.now().plusDays(1));
        testTodo.setCreatedAt(LocalDateTime.now());
        testTodo.setUpdatedAt(LocalDateTime.now());
        
        todoRequest = new TodoRequest();
        todoRequest.setTitle("New Todo");
        todoRequest.setDescription("New Description");
        todoRequest.setPriority(2);
        todoRequest.setDueDate(LocalDateTime.now().plusDays(2));
        
        todoUpdateRequest = new TodoUpdateRequest();
        todoUpdateRequest.setTitle("Updated Todo");
        todoUpdateRequest.setDescription("Updated Description");
        todoUpdateRequest.setCompleted(true);
        todoUpdateRequest.setPriority(0);
        todoUpdateRequest.setDueDate(LocalDateTime.now().plusDays(3));
    }
    
    @Test
    void getAllTodos_ShouldReturnAllTodos() {
        // Given
        List<Todo> expectedTodos = Arrays.asList(testTodo);
        when(todoRepository.findAll()).thenReturn(expectedTodos);
        
        // When
        List<Todo> actualTodos = todoService.getAllTodos();
        
        // Then
        assertEquals(expectedTodos, actualTodos);
        verify(todoRepository).findAll();
    }
    
    @Test
    void getTodoById_WhenTodoExists_ShouldReturnTodo() {
        // Given
        when(todoRepository.findById(1L)).thenReturn(Optional.of(testTodo));
        
        // When
        Optional<Todo> actualTodo = todoService.getTodoById(1L);
        
        // Then
        assertTrue(actualTodo.isPresent());
        assertEquals(testTodo, actualTodo.get());
        verify(todoRepository).findById(1L);
    }
    
    @Test
    void getTodoById_WhenTodoNotExists_ShouldReturnEmpty() {
        // Given
        when(todoRepository.findById(999L)).thenReturn(Optional.empty());
        
        // When
        Optional<Todo> actualTodo = todoService.getTodoById(999L);
        
        // Then
        assertFalse(actualTodo.isPresent());
        verify(todoRepository).findById(999L);
    }
    
    @Test
    void createTodo_ShouldCreateAndReturnTodo() {
        // Given
        when(todoRepository.save(any(Todo.class))).thenReturn(testTodo);
        
        // When
        Todo createdTodo = todoService.createTodo(todoRequest);
        
        // Then
        assertNotNull(createdTodo);
        assertEquals(testTodo, createdTodo);
        verify(todoRepository).save(any(Todo.class));
    }
    
    @Test
    void updateTodo_WhenTodoExists_ShouldUpdateAndReturnTodo() {
        // Given
        when(todoRepository.findById(1L)).thenReturn(Optional.of(testTodo));
        when(todoRepository.save(any(Todo.class))).thenReturn(testTodo);
        
        // When
        Optional<Todo> updatedTodo = todoService.updateTodo(1L, todoUpdateRequest);
        
        // Then
        assertTrue(updatedTodo.isPresent());
        assertEquals(testTodo, updatedTodo.get());
        verify(todoRepository).findById(1L);
        verify(todoRepository).save(any(Todo.class));
    }
    
    @Test
    void updateTodo_WhenTodoNotExists_ShouldReturnEmpty() {
        // Given
        when(todoRepository.findById(999L)).thenReturn(Optional.empty());
        
        // When
        Optional<Todo> updatedTodo = todoService.updateTodo(999L, todoUpdateRequest);
        
        // Then
        assertFalse(updatedTodo.isPresent());
        verify(todoRepository).findById(999L);
        verify(todoRepository, never()).save(any(Todo.class));
    }
    
    @Test
    void toggleTodoStatus_WhenTodoExists_ShouldToggleStatus() {
        // Given
        Todo todoToToggle = new Todo();
        todoToToggle.setId(1L);
        todoToToggle.setCompleted(false);
        
        Todo toggledTodo = new Todo();
        toggledTodo.setId(1L);
        toggledTodo.setCompleted(true);
        
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todoToToggle));
        when(todoRepository.save(any(Todo.class))).thenReturn(toggledTodo);
        
        // When
        Optional<Todo> result = todoService.toggleTodoStatus(1L);
        
        // Then
        assertTrue(result.isPresent());
        assertTrue(result.get().getCompleted());
        verify(todoRepository).findById(1L);
        verify(todoRepository).save(any(Todo.class));
    }
    
    @Test
    void deleteTodo_WhenTodoExists_ShouldReturnTrue() {
        // Given
        when(todoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(todoRepository).deleteById(1L);
        
        // When
        boolean result = todoService.deleteTodo(1L);
        
        // Then
        assertTrue(result);
        verify(todoRepository).existsById(1L);
        verify(todoRepository).deleteById(1L);
    }
    
    @Test
    void deleteTodo_WhenTodoNotExists_ShouldReturnFalse() {
        // Given
        when(todoRepository.existsById(999L)).thenReturn(false);
        
        // When
        boolean result = todoService.deleteTodo(999L);
        
        // Then
        assertFalse(result);
        verify(todoRepository).existsById(999L);
        verify(todoRepository, never()).deleteById(any());
    }
    
    @Test
    void deleteCompletedTodos_ShouldDeleteAndReturnCount() {
        // Given
        when(todoRepository.countByCompleted(true)).thenReturn(5L);
        doNothing().when(todoRepository).deleteByCompleted(true);
        
        // When
        Long deletedCount = todoService.deleteCompletedTodos();
        
        // Then
        assertEquals(5L, deletedCount);
        verify(todoRepository).countByCompleted(true);
        verify(todoRepository).deleteByCompleted(true);
    }
    
    @Test
    void getTodosByStatus_WhenCompletedIsNull_ShouldReturnAllTodos() {
        // Given
        List<Todo> expectedTodos = Arrays.asList(testTodo);
        when(todoRepository.findAll()).thenReturn(expectedTodos);
        
        // When
        List<Todo> actualTodos = todoService.getTodosByStatus(null);
        
        // Then
        assertEquals(expectedTodos, actualTodos);
        verify(todoRepository).findAll();
    }
    
    @Test
    void getTodosByStatus_WhenCompletedIsTrue_ShouldReturnCompletedTodos() {
        // Given
        List<Todo> expectedTodos = Arrays.asList(testTodo);
        when(todoRepository.findByCompleted(true)).thenReturn(expectedTodos);
        
        // When
        List<Todo> actualTodos = todoService.getTodosByStatus(true);
        
        // Then
        assertEquals(expectedTodos, actualTodos);
        verify(todoRepository).findByCompleted(true);
    }
}
