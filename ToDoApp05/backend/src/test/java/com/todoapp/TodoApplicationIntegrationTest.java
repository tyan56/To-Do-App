package com.todoapp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todoapp.dto.TodoRequest;
import com.todoapp.entity.Todo;
import com.todoapp.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@ActiveProfiles("test")
@Transactional
class TodoApplicationIntegrationTest {
    
    @Autowired
    private WebApplicationContext webApplicationContext;
    
    @Autowired
    private TodoRepository todoRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private MockMvc mockMvc;
    
    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        todoRepository.deleteAll();
    }
    
    @Test
    void contextLoads() {
        // 测试Spring上下文是否正常加载
    }
    
    @Test
    void createAndRetrieveTodo_ShouldWork() throws Exception {
        // Given
        TodoRequest todoRequest = new TodoRequest();
        todoRequest.setTitle("Integration Test Todo");
        todoRequest.setDescription("Test Description");
        todoRequest.setPriority(1);
        todoRequest.setDueDate(LocalDateTime.now().plusDays(1));
        
        // When & Then - Create todo
        String response = mockMvc.perform(post("/api/v1/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(todoRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.code").value(201))
                .andExpect(jsonPath("$.data.title").value("Integration Test Todo"))
                .andReturn()
                .getResponse()
                .getContentAsString();
        
        // Extract todo ID from response
        String todoId = extractTodoIdFromResponse(response);
        
        // When & Then - Retrieve todo
        mockMvc.perform(get("/api/v1/todos/" + todoId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.title").value("Integration Test Todo"));
    }
    
    @Test
    void updateTodo_ShouldWork() throws Exception {
        // Given - Create a todo first
        Todo todo = new Todo();
        todo.setTitle("Original Title");
        todo.setDescription("Original Description");
        todo.setCompleted(false);
        todo.setPriority(0);
        todo.setDueDate(LocalDateTime.now().plusDays(1));
        Todo savedTodo = todoRepository.save(todo);
        
        // When & Then - Update the todo
        mockMvc.perform(put("/api/v1/todos/" + savedTodo.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Updated Title\",\"description\":\"Updated Description\",\"completed\":true,\"priority\":2}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.title").value("Updated Title"))
                .andExpect(jsonPath("$.data.completed").value(true));
    }
    
    @Test
    void toggleTodoStatus_ShouldWork() throws Exception {
        // Given - Create a todo first
        Todo todo = new Todo();
        todo.setTitle("Toggle Test Todo");
        todo.setCompleted(false);
        Todo savedTodo = todoRepository.save(todo);
        
        // When & Then - Toggle status
        mockMvc.perform(patch("/api/v1/todos/" + savedTodo.getId() + "/toggle"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.completed").value(true));
        
        // Verify in database
        Todo updatedTodo = todoRepository.findById(savedTodo.getId()).orElse(null);
        assert updatedTodo != null;
        assert updatedTodo.getCompleted();
    }
    
    @Test
    void deleteTodo_ShouldWork() throws Exception {
        // Given - Create a todo first
        Todo todo = new Todo();
        todo.setTitle("Delete Test Todo");
        Todo savedTodo = todoRepository.save(todo);
        
        // When & Then - Delete the todo
        mockMvc.perform(delete("/api/v1/todos/" + savedTodo.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200));
        
        // Verify todo is deleted from database
        assert !todoRepository.existsById(savedTodo.getId());
    }
    
    @Test
    void deleteCompletedTodos_ShouldWork() throws Exception {
        // Given - Create completed and incomplete todos
        Todo completedTodo = new Todo();
        completedTodo.setTitle("Completed Todo");
        completedTodo.setCompleted(true);
        todoRepository.save(completedTodo);
        
        Todo incompleteTodo = new Todo();
        incompleteTodo.setTitle("Incomplete Todo");
        incompleteTodo.setCompleted(false);
        todoRepository.save(incompleteTodo);
        
        // When & Then - Delete completed todos
        mockMvc.perform(delete("/api/v1/todos/completed"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.total").value(1));
        
        // Verify only completed todo is deleted
        assert !todoRepository.existsById(completedTodo.getId());
        assert todoRepository.existsById(incompleteTodo.getId());
    }
    
    @Test
    void searchTodosByTitle_ShouldWork() throws Exception {
        // Given - Create todos with different titles
        Todo todo1 = new Todo();
        todo1.setTitle("Test Todo One");
        todoRepository.save(todo1);
        
        Todo todo2 = new Todo();
        todo2.setTitle("Another Todo");
        todoRepository.save(todo2);
        
        Todo todo3 = new Todo();
        todo3.setTitle("Test Todo Two");
        todoRepository.save(todo3);
        
        // When & Then - Search for "Test"
        mockMvc.perform(get("/api/v1/todos/search")
                        .param("title", "Test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(2));
    }
    
    @Test
    void getTodosByStatus_ShouldWork() throws Exception {
        // Given - Create completed and incomplete todos
        Todo completedTodo = new Todo();
        completedTodo.setTitle("Completed Todo");
        completedTodo.setCompleted(true);
        todoRepository.save(completedTodo);
        
        Todo incompleteTodo = new Todo();
        incompleteTodo.setTitle("Incomplete Todo");
        incompleteTodo.setCompleted(false);
        todoRepository.save(incompleteTodo);
        
        // When & Then - Get completed todos
        mockMvc.perform(get("/api/v1/todos")
                        .param("completed", "true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].title").value("Completed Todo"));
        
        // When & Then - Get incomplete todos
        mockMvc.perform(get("/api/v1/todos")
                        .param("completed", "false"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].title").value("Incomplete Todo"));
    }
    
    @Test
    void healthCheck_ShouldWork() throws Exception {
        // When & Then
        mockMvc.perform(get("/api/v1/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.status").value("UP"))
                .andExpect(jsonPath("$.data.service").value("Todo Application API"));
    }
    
    private String extractTodoIdFromResponse(String response) {
        try {
            // Simple extraction - in a real scenario, you might want to use JSONPath
            int startIndex = response.indexOf("\"id\":") + 5;
            int endIndex = response.indexOf(",", startIndex);
            if (endIndex == -1) {
                endIndex = response.indexOf("}", startIndex);
            }
            return response.substring(startIndex, endIndex).trim();
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract todo ID from response", e);
        }
    }
}
