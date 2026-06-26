package com.eazybytes.jobportal.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PathsConfig {

    @Bean(name = "publicPaths")
    public List<String> publicPaths() {
        return List.of(
                "/contacts/public",
                "/auth/login/public",
                "/companies/public",
                "/auth/register/public",
                "/csrf-token/public",
                "/logging/public",
                "/swagger-ui.html",
                "/swagger-ui/**",
                "/api/v3/api-docs/**",
                "/swagger-resources/**",
                "/swagger-ui.html",
                "/webjars/**"
        );
    }

    @Bean(name = "securedPaths")
    public List<String> securedPaths() {
        return List.of(
                "/**"
        );
    }

    @Bean(name = "adminPaths")
    public List<String> adminPaths() {
        return List.of(
                "/contacts/admin",
                "/contacts/sort/admin",
                "/contacts/page/admin",
                "/contacts/${id}/status/admin",
                "/companies/admin",
                "/companies/${id}/admin",
                "/users/search/admin",
                "/users/${userId}/role/employer/admin",
                "/users/${userId}/role/employer/admin"
        );
    }

}