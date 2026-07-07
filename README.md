<div align="center">

# JobPortal API

### Enterprise-Grade Job Marketplace Platform Built on Spring Boot

*A secure, observable, and horizontally scalable REST platform connecting employers and job seekers.*

[![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Grafana](https://img.shields.io/badge/Grafana-Dashboards-F46800?style=for-the-badge&logo=grafana&logoColor=white)](https://grafana.com/)
[![Prometheus](https://img.shields.io/badge/Prometheus-Metrics-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)](https://prometheus.io/)

[![Maven](https://img.shields.io/badge/Build-Maven-C71A36?style=flat-square&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![Actuator](https://img.shields.io/badge/Spring-Actuator-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/your-org/jobportal-api?style=flat-square)](https://github.com/your-org/jobportal-api/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/your-org/jobportal-api?style=flat-square)](https://github.com/your-org/jobportal-api/network/members)
[![Open Issues](https://img.shields.io/github/issues/your-org/jobportal-api?style=flat-square)](https://github.com/your-org/jobportal-api/issues)

</div>

---

## Project Overview

**JobPortal API** is a production-oriented backend platform for job marketplaces, designed to handle the full lifecycle of recruitment: employer onboarding, company management, job posting, candidate applications, and resume management, backed by role-based access control and centralized observability.

The system is built for teams that need a **reference implementation** of enterprise Spring Boot architecture — not a tutorial project. It targets three audiences:

- **Backend engineers** who need a well-structured, layered Spring Boot service to extend or study.
- **Platform teams** evaluating patterns for authentication, caching, and monitoring in a Java microservice.
- **Recruiting and HR technology teams** building or integrating job-marketplace functionality.

### Architectural Goals

- **Separation of concerns** across controller, service, and repository layers, with DTOs isolating the persistence model from the public API contract.
- **Stateless authentication** using JWT, enabling horizontal scaling without sticky sessions.
- **Defense in depth**, combining Spring Security filters, role-based authorization, password hashing, and input validation.
- **Operational visibility** by default — every instance exposes health, metrics, and readiness endpoints suitable for orchestration platforms.
- **Predictable performance** through Caffeine-backed caching for high-read, low-mutation data such as job listings and company profiles.
- **Container-first deployment**, with a multi-stage Dockerfile producing a minimal, reproducible runtime image.

The result is a service that is straightforward to run locally, but structured the way it would need to be structured to survive a production rollout: instrumented, secured, documented, and testable.

---

## Screenshots Preview

<details>
<summary><strong>Swagger UI</strong></summary>
<br>

`docs/screenshots/swagger-ui.png`
</details>

<details>
<summary><strong>Grafana Dashboard</strong></summary>
<br>

`docs/screenshots/grafana-dashboard.png`
</details>

<details>
<summary><strong>Prometheus Targets</strong></summary>
<br>

`docs/screenshots/prometheus-targets.png`
</details>

<details>
<summary><strong>Docker Desktop</strong></summary>
<br>

`docs/screenshots/docker-desktop.png`
</details>

<details>
<summary><strong>Sample API Response</strong></summary>
<br>

`docs/screenshots/api-response.png`
</details>

<details>
<summary><strong>MySQL Database Schema</strong></summary>
<br>

`docs/screenshots/mysql-schema.png`
</details>

<details>
<summary><strong>Architecture Diagram</strong></summary>
<br>

`docs/screenshots/architecture-diagram.png`
</details>

<details>
<summary><strong>Authentication Flow</strong></summary>
<br>

`docs/screenshots/auth-flow.png`
</details>

> [!NOTE]
> Screenshot assets are referenced from `docs/screenshots/`. Replace with actual captures before publishing.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Authentication Flow](#authentication-flow)
- [Monitoring Flow](#monitoring-flow)
- [Project Structure](#project-structure)
- [Modules](#modules)
- [Database](#database)
- [Caching](#caching)
- [Security](#security)
- [Monitoring](#monitoring)
- [Docker](#docker)
- [API Documentation](#api-documentation)
- [Installation Guide](#installation-guide)
- [Running the Project](#running-the-project)
- [Configuration](#configuration)
- [REST APIs](#rest-apis)
- [Sample Requests](#sample-requests)
- [Sample Responses](#sample-responses)
- [Monitoring URLs](#monitoring-urls)
- [Performance Optimizations](#performance-optimizations)
- [Exception Handling](#exception-handling)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

### Authentication
- JWT-based stateless login and registration
- Refresh-token issuance and rotation
- Password reset workflow with time-limited tokens

### Authorization
- Role-based access control (`ADMIN`, `EMPLOYER`, `JOB_SEEKER`)
- Method-level security via `@PreAuthorize`
- Endpoint-level route protection through Spring Security filter chains

### User Management
- Profile creation, update, and soft deletion
- Account activation and email verification hooks
- Audit fields (`createdAt`, `updatedAt`, `createdBy`) on all core entities

### Employer Features
- Company registration and verification workflow
- Job posting, editing, and archival
- Applicant tracking per job posting

### Job Seeker Features
- Resume upload and versioning
- Job search with filters (location, salary range, employment type)
- Application submission and status tracking

### Company Management
- Company profile and branding metadata
- Employer-to-company association
- Company-level job listing aggregation

### Caching
- Caffeine in-memory cache for job listings and company profiles
- Configurable TTL and maximum entry size
- Cache eviction on write operations

### Monitoring
- Spring Boot Actuator health and info endpoints
- Micrometer metrics exported to Prometheus
- Pre-built Grafana dashboard definitions

### Logging
- Structured JSON logging via Logback
- Correlation IDs propagated through MDC
- Environment-specific log levels

### API Documentation
- OpenAPI 3.0 specification
- Interactive Swagger UI
- Grouped endpoints by domain

### Docker
- Multi-stage Dockerfile for minimal image size
- Docker Compose stack for local development (API, MySQL, Prometheus, Grafana)

### Validation
- Bean Validation (`jakarta.validation`) on all request DTOs
- Centralized validation error formatting

### Security
- BCrypt password hashing
- CORS configuration
- CSRF disabled for stateless API, mitigated via JWT + SameSite cookies where applicable

### Error Handling
- Global exception handler (`@ControllerAdvice`)
- Consistent error response schema across all endpoints

### Performance
- Lazy loading and batch fetching for JPA associations
- Pagination on all list endpoints
- Connection pooling via HikariCP

---

## Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| Java | Core language runtime | 17 (LTS) |
| Spring Boot | Application framework | 3.2.x |
| Spring Security | Authentication & authorization | 6.2.x |
| JWT (jjwt) | Stateless token-based auth | 0.12.x |
| Spring Data JPA | Data access abstraction | 3.2.x |
| Hibernate | ORM implementation | 6.4.x |
| MySQL | Relational data store | 8.0.x |
| Swagger / springdoc-openapi | API documentation UI | 2.4.x |
| OpenAPI | API specification standard | 3.0 |
| Spring Boot Actuator | Health checks & operational endpoints | 3.2.x |
| Prometheus | Metrics collection & storage | 2.51.x |
| Grafana | Metrics visualization | 10.x |
| Micrometer | Metrics facade | 1.12.x |
| Docker | Containerization | 24.x |
| Maven | Build & dependency management | 3.9.x |
| Lombok | Boilerplate reduction | 1.18.x |
| Caffeine | In-memory caching | 3.1.x |
| Jakarta Bean Validation | Request payload validation | 3.0 |
| Spring AOP | Cross-cutting concerns (logging, auditing) | 6.1.x |

---

## Architecture

```plaintext
                                   ┌────────────────────┐
                                   │       Client        │
                                   │  (Web / Mobile App)  │
                                   └──────────┬───────────┘
                                              │ HTTPS
                                              ▼
                              ┌───────────────────────────────┐
                              │      JWT Authentication         │
                              │      Security Filter Chain      │
                              └───────────────┬─────────────────┘
                                              │
                     ┌────────────────────────┼────────────────────────┐
                     ▼                        ▼                        ▼
             ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
             │  Auth Controller │      │ Job Controller  │      │Company Controller│
             └────────┬────────┘       └────────┬────────┘      └────────┬────────┘
                      │                          │                        │
                      ▼                          ▼                        ▼
             ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
             │  Auth Service   │       │  Job Service    │      │ Company Service │
             └────────┬────────┘       └────────┬────────┘      └────────┬────────┘
                      │                          │                        │
                      │                 ┌────────┴────────┐               │
                      │                 ▼                 ▼               │
                      │         ┌───────────────┐ ┌───────────────┐       │
                      │         │  Caffeine Cache │ │  Repositories  │◄─────┘
                      │         └───────────────┘ └────────┬────────┘
                      │                                    │
                      ▼                                    ▼
             ┌───────────────┐                    ┌───────────────┐
             │  Repositories   │───────────────────►│    MySQL DB    │
             └───────────────┘                    └───────────────┘

             ┌─────────────────────────────────────────────────────┐
             │                    Observability Layer                │
             │                                                       │
             │   Actuator ──► Micrometer ──► Prometheus ──► Grafana   │
             └─────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```plaintext
┌──────────┐        ┌───────────────────┐        ┌──────────────────┐        ┌───────────────┐
│  User     │──────► │ Credential          │──────► │  JWT Generation   │──────► │  Token Return   │
│  Login    │        │ Validation           │        │  (Access+Refresh)  │        │  to Client      │
└──────────┘        └───────────────────┘        └──────────────────┘        └───────────────┘


                     Subsequent Authenticated Requests
                     ──────────────────────────────────

┌──────────┐        ┌───────────────┐        ┌───────────────────┐        ┌───────────────┐
│ Request   │──────► │  JWT Filter     │──────► │ Security Context    │──────► │  Authorization  │
│ + Bearer  │        │  (validates      │        │ (populates          │        │  (role check)   │
│  Token    │        │   signature/exp) │        │  Authentication)     │        │                 │
└──────────┘        └───────────────┘        └───────────────────┘        └───────┬───────┘
                                                                                     │
                                                                                     ▼
                                                                            ┌───────────────┐
                                                                            │   Controller    │
                                                                            └───────────────┘
```

---

## Monitoring Flow

```plaintext
┌───────────────┐    ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Spring Boot    │───►│  Micrometer     │───►│  Prometheus     │───►│  Grafana        │
│  Application     │    │  Metrics Facade │    │  Scrape & Store  │    │  Dashboard       │
└───────────────┘    └───────────────┘    └───────────────┘    └───────────────┘
```

---

## Project Structure

```plaintext
jobportal-api/
├── src/
│   ├── main/
│   │   ├── java/com/jobportal/
│   │   │   ├── config/            # Security, cache, OpenAPI, and CORS configuration
│   │   │   ├── controller/        # REST controllers grouped by domain
│   │   │   ├── dto/               # Request/response payload objects
│   │   │   ├── entity/            # JPA entity definitions
│   │   │   ├── exception/         # Custom exceptions and global handler
│   │   │   ├── repository/        # Spring Data JPA repositories
│   │   │   ├── security/          # JWT provider, filters, and user details service
│   │   │   ├── service/           # Business logic layer
│   │   │   ├── util/              # Shared utility classes
│   │   │   └── JobPortalApplication.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── db/migration/      # Flyway versioned migrations
│   └── test/
│       └── java/com/jobportal/    # Unit and integration tests
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── prometheus/prometheus.yml
│   └── grafana/dashboards/
├── pom.xml
└── README.md
```

**Folder responsibilities:**

| Folder | Responsibility |
|---|---|
| `config/` | Wires security rules, cache managers, and OpenAPI metadata |
| `controller/` | Exposes REST endpoints; delegates to services, performs no business logic |
| `dto/` | Decouples the public API contract from persistence entities |
| `entity/` | Defines JPA-mapped domain models and relationships |
| `exception/` | Centralizes custom exceptions and the global `@ControllerAdvice` handler |
| `repository/` | Spring Data JPA interfaces for persistence access |
| `security/` | JWT issuance, validation, filters, and `UserDetailsService` implementation |
| `service/` | Encapsulates business rules, transactional boundaries, and cache interactions |
| `util/` | Shared helpers (mappers, constants, date utilities) |

---

## Modules

<details>
<summary><strong>Authentication</strong></summary>

Handles registration, login, token refresh, and logout. Issues short-lived access tokens and longer-lived refresh tokens, both signed with HMAC-SHA256.
</details>

<details>
<summary><strong>Security</strong></summary>

Configures the Spring Security filter chain, JWT filter ordering, password encoding, and CORS policy. Applies method-level authorization annotations across service classes.
</details>

<details>
<summary><strong>Jobs</strong></summary>

Manages job posting lifecycle: creation, update, archival, search, and application submission. Search supports filtering by location, employment type, and salary range with pagination.
</details>

<details>
<summary><strong>Companies</strong></summary>

Manages company profile data, verification status, and the association between employer accounts and their companies.
</details>

<details>
<summary><strong>Users</strong></summary>

Handles user profile CRUD operations, account status, and role assignment.
</details>

<details>
<summary><strong>Resume</strong></summary>

Manages resume upload, storage reference, and versioning for job seekers, linked to application submissions.
</details>

<details>
<summary><strong>Contact</strong></summary>

Provides a contact/support message endpoint for unauthenticated inquiries, with rate limiting to prevent abuse.
</details>

<details>
<summary><strong>Monitoring</strong></summary>

Exposes Actuator endpoints and custom Micrometer meters for business metrics (e.g., applications submitted per hour).
</details>

<details>
<summary><strong>Caching</strong></summary>

Configures Caffeine cache regions for job listings and company profiles, including TTL and eviction policy.
</details>

<details>
<summary><strong>Configuration</strong></summary>

Centralizes environment-specific properties across `application-dev.yml` and `application-prod.yml`, with secrets sourced from environment variables.
</details>

<details>
<summary><strong>Exception Handling</strong></summary>

Provides a single global exception handler translating domain and validation exceptions into a consistent error response schema.
</details>

<details>
<summary><strong>Utilities</strong></summary>

Shared mapper classes (entity ↔ DTO), constants, and formatting helpers used across service classes.
</details>

---

## Database

The schema follows third normal form (3NF) with explicit foreign key constraints and indexed lookup columns.

**Core entities and relationships:**

| Entity | Relationship |
|---|---|
| `User` | One-to-one with `Employer` or `JobSeeker` profile |
| `Company` | One-to-many with `Job` |
| `Job` | Many-to-one with `Company`; one-to-many with `Application` |
| `Application` | Many-to-one with `Job` and `JobSeeker` |
| `Resume` | One-to-many with `JobSeeker` |

**Indexing strategy:**
- Composite index on `(company_id, status)` for job listing queries
- Index on `email` (unique) for authentication lookups
- Index on `job_id, applicant_id` for application uniqueness enforcement

**Performance considerations:**
- Foreign keys are indexed by default to avoid full table scans on join queries
- Soft deletes (`deleted_at`) avoid cascading destructive deletes on historical application data
- Read-heavy tables (`job`, `company`) are the primary targets of the caching layer

---

## Caching

The application uses **Caffeine** for in-memory caching of frequently read, infrequently mutated data such as job listings and company profiles.

| Setting | Value | Rationale |
|---|---|---|
| TTL (job listings) | 5 minutes | Balances freshness against read load |
| TTL (company profiles) | 15 minutes | Company data changes infrequently |
| Maximum size | 10,000 entries | Bounds memory footprint per instance |
| Eviction policy | Size + time-based (LRU) | Prevents unbounded growth |

Caching reduces average job-search response time and offloads read pressure from MySQL during traffic spikes, at the cost of eventual consistency bounded by the configured TTL.

---

## Security

- **JWT**: Access tokens are short-lived (15 minutes); refresh tokens (7 days) are used to obtain new access tokens without re-authentication.
- **Role-Based Access Control**: Enforced both at the filter-chain level (`HttpSecurity` matchers) and the method level (`@PreAuthorize`).
- **Password Encryption**: BCrypt with a configurable strength factor.
- **CORS**: Explicit allow-list of origins configured per environment.
- **CSRF**: Disabled, as the API is stateless and does not rely on cookie-based session authentication.
- **Security Filters**: Custom `JwtAuthenticationFilter` inserted before `UsernamePasswordAuthenticationFilter` in the chain.
- **Authentication Flow**: See [Authentication Flow](#authentication-flow).
- **Authorization Flow**: Role claims embedded in the JWT are mapped to Spring Security `GrantedAuthority` objects on each request.

---

## Monitoring

- **Spring Boot Actuator**: Exposes `/actuator/health`, `/actuator/info`, and `/actuator/metrics`.
- **Micrometer**: Bridges application metrics to the Prometheus exposition format.
- **Prometheus**: Scrapes `/actuator/prometheus` on a configurable interval.
- **Grafana**: Pre-built dashboards for JVM memory, HTTP request latency, and cache hit ratio.
- **Health Checks**: Composite health indicators for database connectivity and disk space.
- **Metrics**: Request counts, latency percentiles, error rates, and custom business metrics.
- **Dashboards**: JSON dashboard definitions stored under `docker/grafana/dashboards/` for provisioning.

---

## Docker

Docker is used to guarantee a consistent runtime across local, staging, and production environments, and to simplify onboarding to a single `docker compose up`.

**Benefits:**
- Reproducible builds via a multi-stage Dockerfile (build stage uses Maven, runtime stage uses a slim JRE)
- Isolated local stack including MySQL, Prometheus, and Grafana
- Immutable, versioned images suitable for CI/CD promotion across environments

```bash
# Build the image
docker build -t jobportal-api:latest -f docker/Dockerfile .

# Run the container
docker run -p 8080:8080 --env-file .env jobportal-api:latest
```

**Dockerfile stages:**

| Stage | Base Image | Purpose |
|---|---|---|
| `build` | `maven:3.9-eclipse-temurin-17` | Compiles and packages the application |
| `runtime` | `eclipse-temurin:17-jre-alpine` | Runs the packaged JAR with a minimal footprint |

---

## API Documentation

Swagger UI is generated from the OpenAPI 3.0 specification via `springdoc-openapi` and is available once the application is running.

| Resource | URL |
|---|---|
| Swagger UI | `http://localhost:8080/swagger-ui/index.html` |
| OpenAPI JSON | `http://localhost:8080/v3/api-docs` |

Endpoints are grouped by domain tag (Authentication, Jobs, Companies, Users, Admin) for navigability within the Swagger interface.

---

## Installation Guide

### Prerequisites

| Tool | Minimum Version |
|---|---|
| Java (JDK) | 17 |
| Maven | 3.9 |
| MySQL | 8.0 |
| Docker Desktop | 24.x |
| Git | 2.x |

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-org/jobportal-api.git
cd jobportal-api

# 2. Install dependencies
mvn clean install

# 3. Configure the database
mysql -u root -p -e "CREATE DATABASE jobportal;"

# 4. Set required environment variables
export DB_URL=jdbc:mysql://localhost:3306/jobportal
export DB_USERNAME=root
export DB_PASSWORD=your_password
export JWT_SECRET=your_jwt_secret

# 5. Run the project
mvn spring-boot:run

# 6. Verify installation
curl http://localhost:8080/actuator/health
```

---

## Running the Project

### Local

```bash
mvn spring-boot:run
```

### Docker

```bash
docker compose -f docker/docker-compose.yml up --build
```

### Production

```bash
java -jar target/jobportal-api-1.0.0.jar --spring.profiles.active=prod
```

> [!IMPORTANT]
> Production deployments should source secrets (JWT signing key, database credentials) from a secrets manager rather than plain environment files.

---

## Configuration

Configuration is layered across `application.yml`, `application-dev.yml`, and `application-prod.yml`, activated via the `spring.profiles.active` property.

| Property | Description | Example |
|---|---|---|
| `spring.datasource.url` | Database connection URL | `jdbc:mysql://localhost:3306/jobportal` |
| `spring.datasource.username` | Database username | `root` |
| `spring.datasource.password` | Database password | `********` |
| `jwt.secret` | HMAC signing key for JWT | `********` |
| `jwt.access-token-expiration` | Access token TTL (ms) | `900000` |
| `jwt.refresh-token-expiration` | Refresh token TTL (ms) | `604800000` |
| `server.port` | Application HTTP port | `8080` |
| `management.endpoints.web.exposure.include` | Exposed Actuator endpoints | `health,info,prometheus,metrics` |

All sensitive values are expected to be supplied via environment variables and are never committed to source control.

---

## REST APIs

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Authenticate and receive tokens |
| POST | `/api/v1/auth/refresh` | Exchange a refresh token for a new access token |
| POST | `/api/v1/auth/logout` | Invalidate the current refresh token |

### Jobs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/jobs` | List jobs (paginated, filterable) |
| GET | `/api/v1/jobs/{id}` | Retrieve a single job |
| POST | `/api/v1/jobs` | Create a job posting (employer only) |
| PUT | `/api/v1/jobs/{id}` | Update a job posting |
| DELETE | `/api/v1/jobs/{id}` | Archive a job posting |
| POST | `/api/v1/jobs/{id}/apply` | Submit an application |

### Companies

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/companies` | List companies |
| GET | `/api/v1/companies/{id}` | Retrieve company details |
| POST | `/api/v1/companies` | Register a company |
| PUT | `/api/v1/companies/{id}` | Update company details |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/users/me` | Retrieve the current user's profile |
| PUT | `/api/v1/users/me` | Update the current user's profile |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/admin/users` | List all users |
| PUT | `/api/v1/admin/users/{id}/status` | Enable or disable a user account |

### Contacts

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/contact` | Submit a support inquiry |

### Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/actuator/health` | Application health status |

---

## Sample Requests

<details>
<summary><strong>Registration</strong></summary>

```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
        "email": "jane.doe@example.com",
        "password": "SecurePass123!",
        "fullName": "Jane Doe",
        "role": "JOB_SEEKER"
      }'
```
</details>

<details>
<summary><strong>Login</strong></summary>

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
        "email": "jane.doe@example.com",
        "password": "SecurePass123!"
      }'
```
</details>

<details>
<summary><strong>Create Company</strong></summary>

```bash
curl -X POST http://localhost:8080/api/v1/companies \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "Acme Corporation",
        "industry": "Technology",
        "website": "https://acme.example.com"
      }'
```
</details>

<details>
<summary><strong>Create Job</strong></summary>

```bash
curl -X POST http://localhost:8080/api/v1/jobs \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
        "title": "Backend Engineer",
        "companyId": 1,
        "location": "Remote",
        "employmentType": "FULL_TIME",
        "minSalary": 90000,
        "maxSalary": 130000
      }'
```
</details>

<details>
<summary><strong>Search Job</strong></summary>

```bash
curl -G http://localhost:8080/api/v1/jobs \
  --data-urlencode "location=Remote" \
  --data-urlencode "employmentType=FULL_TIME" \
  --data-urlencode "page=0" \
  --data-urlencode "size=20"
```
</details>

<details>
<summary><strong>Apply to Job</strong></summary>

```bash
curl -X POST http://localhost:8080/api/v1/jobs/1/apply \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
        "resumeId": 42,
        "coverLetter": "I am excited to apply for this role..."
      }'
```
</details>

---

## Sample Responses

```json
{
  "id": 101,
  "title": "Backend Engineer",
  "company": {
    "id": 1,
    "name": "Acme Corporation"
  },
  "location": "Remote",
  "employmentType": "FULL_TIME",
  "minSalary": 90000,
  "maxSalary": 130000,
  "status": "ACTIVE",
  "createdAt": "2026-07-01T09:30:00Z"
}
```

```json
{
  "timestamp": "2026-07-07T10:15:00Z",
  "status": 400,
  "error": "VALIDATION_ERROR",
  "message": "Request contains invalid fields",
  "details": [
    {
      "field": "email",
      "issue": "must be a well-formed email address"
    }
  ]
}
```

---

## Monitoring URLs

| Resource | URL |
|---|---|
| Swagger UI | `http://localhost:8080/swagger-ui/index.html` |
| Actuator Root | `http://localhost:8080/actuator` |
| Health | `http://localhost:8080/actuator/health` |
| Metrics | `http://localhost:8080/actuator/metrics` |
| Prometheus Scrape Endpoint | `http://localhost:8080/actuator/prometheus` |
| Prometheus UI | `http://localhost:9090` |
| Grafana | `http://localhost:3000` |

---

## Performance Optimizations

- **Caching**: Caffeine reduces repeated database hits for job and company reads.
- **Batch Fetching**: Hibernate `@BatchSize` reduces N+1 query patterns on collection associations.
- **Lazy Loading**: Associations default to `FetchType.LAZY`, with explicit fetch joins where eager loading is required.
- **Logging**: Asynchronous appenders prevent I/O from blocking request threads under load.

---

## Exception Handling

- **Global Exception Handler**: A single `@ControllerAdvice` class translates all exceptions into a consistent JSON error schema.
- **Validation Errors**: `MethodArgumentNotValidException` is mapped to a `400` response with a field-level breakdown.
- **Authentication Errors**: Invalid or expired credentials return `401` with a generic message to avoid leaking account existence.
- **Authorization Errors**: Insufficient role or permission returns `403` with no sensitive detail exposed.

---

## Future Improvements

1. Migrate refresh-token storage to Redis for distributed session invalidation
2. Add rate limiting at the API gateway layer
3. Introduce event-driven notifications (Kafka) for application status changes
4. Add full-text search via Elasticsearch for job listings
5. Support OAuth2 login (Google, LinkedIn)
6. Add multi-tenancy support for enterprise recruiting clients
7. Introduce GraphQL as an alternative query interface
8. Add automated resume parsing and keyword extraction
9. Implement soft-delete recovery workflows for admins
10. Add distributed tracing via OpenTelemetry
11. Introduce blue-green deployment pipeline in CI/CD
12. Add configurable email notification templates
13. Support file storage via S3-compatible object storage for resumes
14. Add integration test coverage for all controller endpoints
15. Introduce API versioning strategy for backward compatibility

---

## Contributing

Contributions are welcome. Please follow the process below:

1. Fork the repository and create a feature branch (`git checkout -b feature/your-feature`).
2. Write tests for any new functionality.
3. Ensure `mvn verify` passes locally before opening a pull request.
4. Follow the existing code style (Lombok conventions, layered architecture).
5. Submit a pull request with a clear description of the change and its motivation.

> [!TIP]
> For substantial changes, open an issue first to discuss the proposed approach.
---

## Author

<div align="center">

**Gayathri Chauhan**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/gayathrichauhan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gayathri-chauhan/)


</div>
