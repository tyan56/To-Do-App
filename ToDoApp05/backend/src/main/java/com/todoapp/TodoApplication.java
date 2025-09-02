package com.todoapp;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Todo Application API",
        version = "1.0.0",
        description = "A RESTful API for managing todo items",
        contact = @Contact(
            name = "Todo App Team",
            email = "support@todoapp.com"
        ),
        license = @License(
            name = "MIT License",
            url = "https://opensource.org/licenses/MIT"
        )
    )
)
public class TodoApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }
}
