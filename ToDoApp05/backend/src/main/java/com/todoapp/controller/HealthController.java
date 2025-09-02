package com.todoapp.controller;

import com.todoapp.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@CrossOrigin(origins = "*")
@Tag(name = "Health Check", description = "Health check APIs")
public class HealthController {
    
    @GetMapping
    @Operation(summary = "Health check", description = "Check the health status of the application")
    public ResponseEntity<ApiResponse<Map<String, Object>>> healthCheck() {
        Map<String, Object> healthData = new HashMap<>();
        healthData.put("status", "UP");
        healthData.put("timestamp", LocalDateTime.now());
        healthData.put("service", "Todo Application API");
        healthData.put("version", "1.0.0");
        healthData.put("environment", "development");
        
        return ResponseEntity.ok(ApiResponse.success(healthData));
    }
}
