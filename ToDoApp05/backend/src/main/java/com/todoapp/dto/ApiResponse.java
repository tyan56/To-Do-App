package com.todoapp.dto;

import java.time.LocalDateTime;

public class ApiResponse<T> {
    private Integer code;
    private String message;
    private T data;
    private Long total;
    private LocalDateTime timestamp;
    
    public ApiResponse() {
        this.timestamp = LocalDateTime.now();
    }
    
    public ApiResponse(Integer code, String message, T data, Long total) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.total = total;
        this.timestamp = LocalDateTime.now();
    }
    
    // 成功响应
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "success", data, null);
    }
    
    public static <T> ApiResponse<T> success(T data, Long total) {
        return new ApiResponse<>(200, "success", data, total);
    }
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(200, message, data, null);
    }
    
    public static <T> ApiResponse<T> success(String message, T data, Long total) {
        return new ApiResponse<>(200, message, data, total);
    }
    
    // 创建成功响应
    public static <T> ApiResponse<T> created(T data) {
        return new ApiResponse<>(201, "Created successfully", data, null);
    }
    
    // 错误响应
    public static <T> ApiResponse<T> error(Integer code, String message) {
        return new ApiResponse<>(code, message, null, null);
    }
    
    public static <T> ApiResponse<T> badRequest(String message) {
        return new ApiResponse<>(400, message, null, null);
    }
    
    public static <T> ApiResponse<T> notFound(String message) {
        return new ApiResponse<>(404, message, null, null);
    }
    
    public static <T> ApiResponse<T> internalError(String message) {
        return new ApiResponse<>(500, message, null, null);
    }
    
    // Getter和Setter方法
    public Integer getCode() {
        return code;
    }
    
    public void setCode(Integer code) {
        this.code = code;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public T getData() {
        return data;
    }
    
    public void setData(T data) {
        this.data = data;
    }
    
    public Long getTotal() {
        return total;
    }
    
    public void setTotal(Long total) {
        this.total = total;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
