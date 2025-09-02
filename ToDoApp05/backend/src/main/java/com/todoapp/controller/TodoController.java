package com.todoapp.controller;

import com.todoapp.dto.ApiResponse;
import com.todoapp.dto.TodoRequest;
import com.todoapp.dto.TodoUpdateRequest;
import com.todoapp.entity.Todo;
import com.todoapp.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/todos")
@CrossOrigin(origins = "*")
@Tag(name = "Todo Management", description = "Todo management APIs")
public class TodoController {
    
    private final TodoService todoService;
    
    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
    
    @GetMapping
    @Operation(summary = "Get all todos", description = "Retrieve all todos with optional filtering and pagination")
    public ResponseEntity<ApiResponse<List<Todo>>> getAllTodos(
            @Parameter(description = "Filter by completion status") 
            @RequestParam(required = false) Boolean completed,
            @Parameter(description = "Page number (0-based)") 
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") 
            @RequestParam(defaultValue = "100") int size) {
        
        List<Todo> todos;
        if (completed != null) {
            todos = todoService.getTodosByStatus(completed);
        } else {
            todos = todoService.getAllTodos();
        }
        
        return ResponseEntity.ok(ApiResponse.success(todos, (long) todos.size()));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get todo by ID", description = "Retrieve a specific todo by its ID")
    public ResponseEntity<ApiResponse<Todo>> getTodoById(
            @Parameter(description = "Todo ID") 
            @PathVariable Long id) {
        
        Optional<Todo> todo = todoService.getTodoById(id);
        return todo.map(t -> ResponseEntity.ok(ApiResponse.success(t)))
                  .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                          .body(ApiResponse.notFound("Todo not found with id: " + id)));
    }
    
    @PostMapping
    @Operation(summary = "Create new todo", description = "Create a new todo item")
    public ResponseEntity<ApiResponse<Todo>> createTodo(
            @Parameter(description = "Todo request data") 
            @Valid @RequestBody TodoRequest todoRequest) {
        
        Todo createdTodo = todoService.createTodo(todoRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created(createdTodo));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update todo", description = "Update an existing todo item")
    public ResponseEntity<ApiResponse<Todo>> updateTodo(
            @Parameter(description = "Todo ID") 
            @PathVariable Long id,
            @Parameter(description = "Updated todo data") 
            @Valid @RequestBody TodoUpdateRequest todoUpdateRequest) {
        
        Optional<Todo> updatedTodo = todoService.updateTodo(id, todoUpdateRequest);
        return updatedTodo.map(todo -> ResponseEntity.ok(ApiResponse.success("Todo updated successfully", todo)))
                         .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(ApiResponse.notFound("Todo not found with id: " + id)));
    }
    
    @PatchMapping("/{id}/toggle")
    @Operation(summary = "Toggle todo status", description = "Toggle the completion status of a todo")
    public ResponseEntity<ApiResponse<Todo>> toggleTodoStatus(
            @Parameter(description = "Todo ID") 
            @PathVariable Long id) {
        
        Optional<Todo> toggledTodo = todoService.toggleTodoStatus(id);
        return toggledTodo.map(todo -> ResponseEntity.ok(ApiResponse.success("Todo status toggled successfully", todo)))
                         .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(ApiResponse.notFound("Todo not found with id: " + id)));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete todo", description = "Delete a specific todo by its ID")
    public ResponseEntity<ApiResponse<Void>> deleteTodo(
            @Parameter(description = "Todo ID") 
            @PathVariable Long id) {
        
        boolean deleted = todoService.deleteTodo(id);
        if (deleted) {
            return ResponseEntity.ok(ApiResponse.success("Todo deleted successfully", null, null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.notFound("Todo not found with id: " + id));
        }
    }
    
    @DeleteMapping("/completed")
    @Operation(summary = "Delete completed todos", description = "Delete all completed todos")
    public ResponseEntity<ApiResponse<Void>> deleteCompletedTodos() {
        Long deletedCount = todoService.deleteCompletedTodos();
        return ResponseEntity.ok(ApiResponse.success("Completed todos deleted successfully", null, deletedCount));
    }
    
    @DeleteMapping("/all")
    @Operation(summary = "Delete all todos", description = "Delete all todos")
    public ResponseEntity<ApiResponse<Void>> deleteAllTodos() {
        Long deletedCount = todoService.deleteAllTodos();
        return ResponseEntity.ok(ApiResponse.success("All todos deleted successfully", null, deletedCount));
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search todos by title", description = "Search todos by title containing the given keyword")
    public ResponseEntity<ApiResponse<List<Todo>>> searchTodosByTitle(
            @Parameter(description = "Search keyword") 
            @RequestParam String title) {
        
        List<Todo> todos = todoService.searchTodosByTitle(title);
        return ResponseEntity.ok(ApiResponse.success(todos, (long) todos.size()));
    }
    
    @GetMapping("/priority/{priority}")
    @Operation(summary = "Get todos by priority", description = "Get todos filtered by priority level")
    public ResponseEntity<ApiResponse<List<Todo>>> getTodosByPriority(
            @Parameter(description = "Priority level (0-低, 1-中, 2-高)") 
            @PathVariable Integer priority) {
        
        List<Todo> todos = todoService.getTodosByPriority(priority);
        return ResponseEntity.ok(ApiResponse.success(todos, (long) todos.size()));
    }
    
    @GetMapping("/upcoming")
    @Operation(summary = "Get upcoming todos", description = "Get todos that are due soon")
    public ResponseEntity<ApiResponse<List<Todo>>> getUpcomingTodos(
            @Parameter(description = "Due date threshold") 
            @RequestParam LocalDateTime dueDate) {
        
        List<Todo> todos = todoService.getUpcomingTodos(dueDate);
        return ResponseEntity.ok(ApiResponse.success(todos, (long) todos.size()));
    }
    
    @GetMapping("/count")
    @Operation(summary = "Count todos", description = "Count todos by completion status")
    public ResponseEntity<ApiResponse<Long>> countTodos(
            @Parameter(description = "Filter by completion status") 
            @RequestParam(required = false) Boolean completed) {
        
        Long count = todoService.countTodosByStatus(completed);
        return ResponseEntity.ok(ApiResponse.success(count));
    }
}
