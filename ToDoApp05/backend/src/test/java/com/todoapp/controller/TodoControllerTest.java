package com.todoapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todoapp.dto.TodoRequest;
import com.todoapp.dto.TodoUpdateRequest;
import com.todoapp.entity.Todo;
import com.todoapp.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TodoController.class)
class TodoControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private TodoService todoService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
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
    void getAllTodos_ShouldReturnTodos() throws Exception {
        // Given
        List<Todo> todos = Arrays.asList(testTodo);
        when(todoService.getAllTodos()).thenReturn(todos);
        
        // When & Then
        mockMvc.perform(get("/api/v1/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].id").value(1))
                .andExpect(jsonPath("$.data[0].title").value("Test Todo"));
        
        verify(todoService).getAllTodos();
    }
    
    @Test
    void getTodoById_WhenTodoExists_ShouldReturnTodo() throws Exception {
        // Given
        when(todoService.getTodoById(1L)).thenReturn(Optional.of(testTodo));
        
        // When & Then
        mockMvc.perform(get("/api/v1/todos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.title").value("Test Todo"));
        
        verify(todoService).getTodoById(1L);
    }
    
    @Test
    void getTodoById_WhenTodoNotExists_ShouldReturnNotFound() throws Exception {
        // Given
        when(todoService.getTodoById(999L)).thenReturn(Optional.empty());
        
        // When & Then
        mockMvc.perform(get("/api/v1/todos/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(404));
        
        verify(todoService).getTodoById(999L);
    }
    
    @Test
    void createTodo_ShouldCreateAndReturnTodo() throws Exception {
        // Given
        when(todoService.createTodo(any(TodoRequest.class))).thenReturn(testTodo);
        
        // When & Then
        mockMvc.perform(post("/api/v1/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(todoRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.code").value(201))
                .andExpect(jsonPath("$.data.id").value(1));
        
        verify(todoService).createTodo(any(TodoRequest.class));
    }
    
    @Test
    void createTodo_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        // Given
        TodoRequest invalidRequest = new TodoRequest();
        invalidRequest.setTitle(""); // Invalid: empty title
        
        // When & Then
        mockMvc.perform(post("/api/v1/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
        
        verify(todoService, never()).createTodo(any());
    }
    
    @Test
    void updateTodo_WhenTodoExists_ShouldUpdateAndReturnTodo() throws Exception {
        // Given
        when(todoService.updateTodo(eq(1L), any(TodoUpdateRequest.class)))
                .thenReturn(Optional.of(testTodo));
        
        // When & Then
        mockMvc.perform(put("/api/v1/todos/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(todoUpdateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.id").value(1));
        
        verify(todoService).updateTodo(eq(1L), any(TodoUpdateRequest.class));
    }
    
    @Test
    void updateTodo_WhenTodoNotExists_ShouldReturnNotFound() throws Exception {
        // Given
        when(todoService.updateTodo(eq(999L), any(TodoUpdateRequest.class)))
                .thenReturn(Optional.empty());
        
        // When & Then
        mockMvc.perform(put("/api/v1/todos/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(todoUpdateRequest)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(404));
        
        verify(todoService).updateTodo(eq(999L), any(TodoUpdateRequest.class));
    }
    
    @Test
    void toggleTodoStatus_WhenTodoExists_ShouldToggleStatus() throws Exception {
        // Given
        Todo toggledTodo = new Todo();
        toggledTodo.setId(1L);
        toggledTodo.setCompleted(true);
        
        when(todoService.toggleTodoStatus(1L)).thenReturn(Optional.of(toggledTodo));
        
        // When & Then
        mockMvc.perform(patch("/api/v1/todos/1/toggle"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.completed").value(true));
        
        verify(todoService).toggleTodoStatus(1L);
    }
    
    @Test
    void deleteTodo_WhenTodoExists_ShouldDeleteAndReturnSuccess() throws Exception {
        // Given
        when(todoService.deleteTodo(1L)).thenReturn(true);
        
        // When & Then
        mockMvc.perform(delete("/api/v1/todos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200));
        
        verify(todoService).deleteTodo(1L);
    }
    
    @Test
    void deleteTodo_WhenTodoNotExists_ShouldReturnNotFound() throws Exception {
        // Given
        when(todoService.deleteTodo(999L)).thenReturn(false);
        
        // When & Then
        mockMvc.perform(delete("/api/v1/todos/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(404));
        
        verify(todoService).deleteTodo(999L);
    }
    
    @Test
    void deleteCompletedTodos_ShouldDeleteAndReturnCount() throws Exception {
        // Given
        when(todoService.deleteCompletedTodos()).thenReturn(5L);
        
        // When & Then
        mockMvc.perform(delete("/api/v1/todos/completed"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.total").value(5));
        
        verify(todoService).deleteCompletedTodos();
    }
    
    @Test
    void deleteAllTodos_ShouldDeleteAndReturnCount() throws Exception {
        // Given
        when(todoService.deleteAllTodos()).thenReturn(10L);
        
        // When & Then
        mockMvc.perform(delete("/api/v1/todos/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.total").value(10));
        
        verify(todoService).deleteAllTodos();
    }
    
    @Test
    void searchTodosByTitle_ShouldReturnMatchingTodos() throws Exception {
        // Given
        List<Todo> todos = Arrays.asList(testTodo);
        when(todoService.searchTodosByTitle("Test")).thenReturn(todos);
        
        // When & Then
        mockMvc.perform(get("/api/v1/todos/search")
                        .param("title", "Test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data").isArray());
        
        verify(todoService).searchTodosByTitle("Test");
    }
}
