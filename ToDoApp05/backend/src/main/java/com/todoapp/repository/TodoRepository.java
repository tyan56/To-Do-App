package com.todoapp.repository;

import com.todoapp.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    // 根据完成状态查询
    List<Todo> findByCompleted(Boolean completed);
    
    // 根据完成状态分页查询
    Page<Todo> findByCompleted(Boolean completed, Pageable pageable);
    
    // 根据优先级查询
    List<Todo> findByPriority(Integer priority);
    
    // 根据标题模糊查询
    List<Todo> findByTitleContainingIgnoreCase(String title);
    
    // 根据完成状态统计数量
    Long countByCompleted(Boolean completed);
    
    // 统计所有待办事项数量
    @Query("SELECT COUNT(t) FROM Todo t")
    Long countAllTodos();
    
    // 根据完成状态和优先级查询
    List<Todo> findByCompletedAndPriority(Boolean completed, Integer priority);
    
    // 查询即将到期的待办事项（未完成且截止日期在指定时间内）
    @Query("SELECT t FROM Todo t WHERE t.completed = false AND t.dueDate IS NOT NULL AND t.dueDate <= :dueDate")
    List<Todo> findUpcomingTodos(@Param("dueDate") java.time.LocalDateTime dueDate);
    
    // 根据完成状态删除
    void deleteByCompleted(Boolean completed);
    
    // 删除所有待办事项
    @Query("DELETE FROM Todo")
    void deleteAllTodos();
}
