package com.eazybytes.jobportal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ContactRequestDto {

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @NotBlank(message = "Subject cannot be blank")
    private String subject;

    @NotBlank(message = "Message cannot be blank")
    private String message;

    @NotBlank(message = "User type cannot be blank")
    private String userType;
}