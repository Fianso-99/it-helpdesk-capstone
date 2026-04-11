\# 🖥️ IT Helpdesk System — Capstone Project



A full-stack IT Helpdesk application built with Spring Boot, React, and MySQL.

Allows employees to submit IT support tickets and administrators to manage and resolve them.



\---



\## 🛠️ Tech Stack



\### Backend

\- Java 21

\- Spring Boot 4.0.5

\- Spring Security + JWT Authentication

\- Spring Data JPA / Hibernate

\- MySQL Database



\### Frontend

\- React (Vite)

\- Bootstrap 5

\- Bootstrap Icons

\- Axios

\- React Router DOM



\---



\## ✨ Features



\- 🔐 JWT-based Authentication (Login \& Register)

\- 👥 Role-based Access Control (ADMIN / USER)

\- 🎫 Full Ticket Management (Create, View, Update, Delete)

\- 💬 Comments System on Tickets

\- 📊 Dashboard with Live Statistics

\- 🔍 Search \& Filter Tickets

\- 📱 Responsive Design



\---



\## 🚀 Getting Started



\### Prerequisites

\- Java 21+

\- Node.js 18+

\- MySQL 8.0+

\- Maven



\---



\### 1️⃣ Database Setup



Open MySQL and run:

```sql

CREATE DATABASE helpdesk\_db\_capstone;

```



\---



\### 2️⃣ Backend Setup



```bash

\# Clone the repository

git clone <your-repo-url>



\# Navigate to backend

cd helpdesk-backend



\# Configure database in application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/helpdesk\_db\_capstone

spring.datasource.username=root

spring.datasource.password=yourpassword



\# Run the application

./mvnw spring-boot:run

```



Backend runs on: `http://localhost:8080`



\---



\### 3️⃣ Frontend Setup



```bash

\# Navigate to frontend

cd helpdesk-frontend



\# Install dependencies

npm install



\# Run the application

npm run dev

```



Frontend runs on: `http://localhost:5174`



\---



\## 🔑 Test Credentials



| Role | Email | Password |

|------|-------|----------|

| Admin | admin@company.com | admin123 |

| User | mike@company.com | mike123 |



\---



\## 📡 API Endpoints



\### Authentication

| Method | Endpoint | Description |

|--------|----------|-------------|

| POST | /api/auth/register | Register new user |

| POST | /api/auth/login | Login \& get JWT token |



\### Tickets

| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | /api/tickets | Get all tickets |

| GET | /api/tickets/{id} | Get ticket by ID |

| POST | /api/tickets/user/{userId} | Create new ticket |

| PUT | /api/tickets/{id} | Update ticket |

| DELETE | /api/tickets/{id} | Delete ticket |

| GET | /api/tickets/dashboard/stats | Get dashboard stats |

| GET | /api/tickets/user/{userId} | Get tickets by user |



\### Comments

| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | /api/tickets/{ticketId}/comments | Get comments |

| POST | /api/tickets/{ticketId}/comments | Add comment |



\### Users

| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | /api/users | Get all users (ADMIN) |

| GET | /api/users/{id} | Get user by ID |

| PUT | /api/users/{id} | Update user |

| DELETE | /api/users/{id} | Delete user |



\---



\## 🗄️ Database Schema



\### Users Table

| Column | Type | Description |

|--------|------|-------------|

| id | BIGINT | Primary Key |

| name | VARCHAR | User's full name |

| email | VARCHAR | Unique email |

| password | VARCHAR | BCrypt hashed |

| role | ENUM | USER or ADMIN |

| created\_at | DATETIME | Creation timestamp |



\### Tickets Table

| Column | Type | Description |

|--------|------|-------------|

| id | BIGINT | Primary Key |

| title | VARCHAR | Issue title |

| description | TEXT | Issue details |

| category | ENUM | HARDWARE/SOFTWARE/NETWORK/EMAIL/OTHER |

| priority | ENUM | LOW/MEDIUM/HIGH/CRITICAL |

| status | ENUM | OPEN/IN\_PROGRESS/RESOLVED/CLOSED |

| user\_id | BIGINT | Foreign Key → users |

| created\_at | DATETIME | Creation timestamp |

| updated\_at | DATETIME | Last update timestamp |



\### Comments Table

| Column | Type | Description |

|--------|------|-------------|

| id | BIGINT | Primary Key |

| content | TEXT | Comment text |

| ticket\_id | BIGINT | Foreign Key → tickets |

| user\_id | BIGINT | Foreign Key → users |

| created\_at | DATETIME | Creation timestamp |



\---



\## 🧪 Running Tests



```bash

\# Run all tests

./mvnw test



\# Run specific test class

./mvnw test -Dtest=UserServiceTest

./mvnw test -Dtest=TicketServiceTest

```



\### Test Coverage

\- ✅ UserServiceTest — 10 tests

\- ✅ TicketServiceTest — 10 tests

\- ✅ Total: 20 tests passing



\---



\## 🏗️ Project Structure



helpdesk-backend/

├── src/

│   ├── main/java/com/helpdesk/backend/

│   │   ├── controller/

│   │   │   ├── AuthController.java

│   │   │   ├── TicketController.java

│   │   │   ├── UserController.java

│   │   │   └── CommentController.java

│   │   ├── entity/

│   │   │   ├── User.java

│   │   │   ├── Ticket.java

│   │   │   └── Comment.java

│   │   ├── repository/

│   │   │   ├── UserRepository.java

│   │   │   ├── TicketRepository.java

│   │   │   └── CommentRepository.java

│   │   ├── service/

│   │   │   ├── UserService.java

│   │   │   ├── TicketService.java

│   │   │   └── CommentService.java

│   │   └── security/

│   │       ├── JwtUtil.java

│   │       ├── JwtFilter.java

│   │       └── SecurityConfig.java

│   └── test/

│       └── java/com/helpdesk/backend/

│           └── service/

│               ├── UserServiceTest.java

│               └── TicketServiceTest.java

│

helpdesk-frontend/

├── src/

│   ├── components/

│   │   ├── Sidebar.jsx

│   │   └── Layout.jsx

│   ├── pages/

│   │   ├── Login.jsx

│   │   ├── Register.jsx

│   │   ├── Dashboard.jsx

│   │   ├── Tickets.jsx

│   │   ├── CreateTicket.jsx

│   │   └── TicketDetail.jsx

│   ├── services/

│   │   └── api.js

│   └── context/

│       └── AuthContext.jsx





\---



\## 👨‍💻 Author



\- \*\*Name\*\*: Soufiane Kenioua

\- \*\*Course\*\*: UCI 2123 — Systems Engineering with AWS

\- \*\*Project\*\*: IT Helpdesk Capstone



\---



\## 📝 License



This project was built as a capstone project for educational purposes.

