package com.todoapp.service;

import com.todoapp.dto.TodoRequest;
import com.todoapp.dto.TodoUpdateRequest;
import com.todoapp.entity.Todo;
import com.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TodoService {
    
    private final TodoRepository todoRepository;
    
    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }
    
    /**
     * 获取所有待办事项
     */
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
    
    /**
     * 分页获取待办事项
     */
    public Page<Todo> getTodosWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return todoRepository.findAll(pageable);
    }
    
    /**
     * 根据完成状态获取待办事项
     */
    public List<Todo> getTodosByStatus(Boolean completed) {
        if (completed == null) {
            return todoRepository.findAll();
        }
        return todoRepository.findByCompleted(completed);
    }
    
    /**
     * 根据完成状态分页获取待办事项
     */
    public Page<Todo> getTodosByStatusWithPagination(Boolean completed, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        if (completed == null) {
            return todoRepository.findAll(pageable);
        }
        return todoRepository.findByCompleted(completed, pageable);
    }
    
    /**
     * 根据ID获取待办事项
     */
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }
    
    /**
     * 创建待办事项
     */
    public Todo createTodo(TodoRequest todoRequest) {
        Todo todo = new Todo();
        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription());
        todo.setPriority(todoRequest.getPriority() != null ? todoRequest.getPriority() : 0);
        todo.setDueDate(todoRequest.getDueDate());
        todo.setCompleted(false);
        
        return todoRepository.save(todo);
    }
    
    /**
     * 更新待办事项
     */
    public Optional<Todo> updateTodo(Long id, TodoUpdateRequest todoUpdateRequest) {
        return todoRepository.findById(id).map(todo -> {
            todo.setTitle(todoUpdateRequest.getTitle());
            todo.setDescription(todoUpdateRequest.getDescription());
            if (todoUpdateRequest.getCompleted() != null) {
                todo.setCompleted(todoUpdateRequest.getCompleted());
            }
            if (todoUpdateRequest.getPriority() != null) {
                todo.setPriority(todoUpdateRequest.getPriority());
            }
            todo.setDueDate(todoUpdateRequest.getDueDate());
            
            return todoRepository.save(todo);
        });
    }
    
    /**
     * 切换待办事项完成状态
     */
    public Optional<Todo> toggleTodoStatus(Long id) {
        return todoRepository.findById(id).map(todo -> {
            todo.setCompleted(!todo.getCompleted());
            return todoRepository.save(todo);
        });
    }
    
    /**
     * 删除待办事项
     */
    public boolean deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    /**
     * 删除已完成的待办事项
     */
    public Long deleteCompletedTodos() {
        Long count = todoRepository.countByCompleted(true);
        todoRepository.deleteByCompleted(true);
        return count;
    }
    
    /**
     * 删除所有待办事项
     */
    public Long deleteAllTodos() {
        Long count = todoRepository.countAllTodos();
        todoRepository.deleteAll();
        return count;
    }
    
    /**
     * 根据标题搜索待办事项
     */
    public List<Todo> searchTodosByTitle(String title) {
        return todoRepository.findByTitleContainingIgnoreCase(title);
    }
    
    /**
     * 根据优先级获取待办事项
     */
    public List<Todo> getTodosByPriority(Integer priority) {
        return todoRepository.findByPriority(priority);
    }
    
    /**
     * 获取即将到期的待办事项
     */
    public List<Todo> getUpcomingTodos(LocalDateTime dueDate) {
        return todoRepository.findUpcomingTodos(dueDate);
    }
    
    /**
     * 统计待办事项数量
     */
    public Long countTodosByStatus(Boolean completed) {
        if (completed == null) {
            return todoRepository.countAllTodos();
        }
        return todoRepository.countByCompleted(completed);
    }
    
    /**
     * 统计所有待办事项数量
     */
    public Long countAllTodos() {
        return todoRepository.countAllTodos();
    }
}
