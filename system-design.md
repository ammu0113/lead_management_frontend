# **System Design Document - Lead Management Frontend Application**

## **1. Introduction**

### **1.1 Overview**

The Lead Management Frontend Application is designed to facilitate lead submission, tracking, and management. It consists of a **public lead submission form** and an **authenticated internal lead management system** for reviewing and updating lead statuses.

### **1.2 Objectives**

- Provide an intuitive interface for submitting leads.
- Allow internal users to track and update lead statuses.
- Ensure data security and smooth user experience.
- Support scalability and maintainability.

---

## **2. System Architecture**

### **2.1 High-Level Architecture**

The application follows a **modular, client-server architecture**:

- **Frontend:** Next.js (React-based framework) for dynamic UI rendering.
- **API Gateway:** Handles request routing, authentication, and API security.
- **Backend (Optional):** Can use Next.js API routes for lead management.
- **Database (Mock or Real):** Stores lead information and status updates.
- **Authentication System:** Secures internal lead management UI.

### **2.2 Component Diagram**

```
User  →  Public Lead Form  →  API Gateway  →  Database (Leads)
                          →  Internal Lead Management UI  →  Authentication
```

---

## **3. Functional Components**

### **3.1 Public Lead Submission Form**

#### **Features:**

- Collects user details (First Name, Last Name, Email, LinkedIn Profile, Visas of Interest, Resume Upload, Additional Information).
- Validates required fields and file formats.
- Displays confirmation messages post-submission.
- Ensures UI aligns with provided mock-ups.

#### **Technical Design:**

- **Form Handling:** React Hook Form for efficient state management.
- **File Uploads:** Handled via FormData and stored in cloud storage (if backend is present).
- **Validation:** Client-side validation with Yup/React Hook Form.
- **API Interaction:** Submits lead data to Next.js API routes (or a mock API).

### **3.2 Internal Lead Management UI**

#### **Features:**

- Displays a list of leads with their details.
- Allows internal users to update lead status (PENDING → REACHED_OUT).
- Secure access via authentication.
- UI matches provided mock-ups.

#### **Technical Design:**

- **Data Fetching:** Uses SWR/React Query for optimized API calls.
- **Authentication:** Mock auth (or NextAuth.js for real implementation).
- **State Management:** Local state for UI updates; Redux Toolkit for larger state management.
- **Role-Based Access Control (RBAC):** Only authorized users can modify lead statuses.

---

## **4. API Design**

### **4.1 API Endpoints**

| Method  | Endpoint                | Description         |
| ------- | ----------------------- | ------------------- |
| `POST`  | `/api/leads`            | Submits a new lead  |
| `GET`   | `/api/leads`            | Fetches all leads   |
| `PATCH` | `/api/leads/:id/status` | Updates lead status |

### **4.2 Authentication API**

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| `POST` | `/api/auth/login`  | Authenticates user             |
| `POST` | `/api/auth/logout` | Logs out user                  |
| `GET`  | `/api/auth/user`   | Fetches logged-in user details |

---

## **5. Data Model Design**

### **5.1 Database Schema (SQL Approach)**

#### **Leads Table**

| Column            | Type      | Description                       |
| ----------------- | --------- | --------------------------------- |
| `id`              | UUID      | Unique lead ID                    |
| `first_name`      | STRING    | Lead’s first name                 |
| `last_name`       | STRING    | Lead’s last name                  |
| `email`           | STRING    | Contact email                     |
| `linkedin`        | STRING    | LinkedIn profile URL              |
| `visas`           | ARRAY     | Selected visas                    |
| `resume_url`      | STRING    | Resume file location              |
| `additional_info` | TEXT      | Additional notes                  |
| `status`          | ENUM      | Lead status (PENDING/REACHED_OUT) |
| `created_at`      | TIMESTAMP | Lead creation date                |

---

## **6. Security Considerations**

### **6.1 Authentication & Authorization**

- Use **NextAuth.js** or a mock auth system for internal UI.
- Implement **JWT-based authentication**.
- Restrict API access based on roles.

### **6.2 Input Validation & Security Best Practices**

- Sanitize input to prevent **SQL injection & XSS attacks**.
- Rate-limit API requests to prevent **brute-force attacks**.
- Secure file uploads using **Cloudinary/AWS S3** (if applicable).

---

## **7. Scalability & Performance**

### **7.1 Performance Optimizations**

- **Use ISR (Incremental Static Regeneration)** for pre-rendering UI.
- **Cache API responses** to reduce database queries.
- **Optimize database queries** using indexes.

### **7.2 Load Handling & Scaling**

- Deploy on **Vercel** (serverless) for frontend hosting.
- Use **CDN** to serve static assets efficiently.
- Scale database (PostgreSQL/MySQL) based on demand.

---

## **8. Deployment Strategy**

### **8.1 Local Development**

1. Clone the repository:
   ```bash
   git clone https://github.com/ammu0113/lead_management_frontend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```

### **8.2 Deployment to Vercel**

- Push changes to GitHub.
- Connect repository to **Vercel**.
- Deploy frontend and configure environment variables.

---

## **9. Testing Strategy**

### **9.1 Unit & Integration Tests**

- **Jest & React Testing Library** for UI tests.
- **Cypress** for end-to-end testing.
- **Mock API testing** to validate API interactions.

### **9.2 Security Testing**

- **Run OWASP ZAP scans** to detect vulnerabilities.
- **Perform penetration testing** for API security.

---

## **10. Conclusion**

This document provides a **comprehensive system design overview** for the Lead Management Frontend Application, covering **architecture, API design, security, scalability, and deployment**. The system ensures **secure lead submission and tracking with an optimized user experience**.

🚀 **Next Steps:**

- Finalize API implementation.
- Integrate authentication and role-based access control.
- Deploy on **Vercel** and conduct performance testing.

🔗 **GitHub Repository:** https://github.com/ammu0113/lead_management_frontend.git
