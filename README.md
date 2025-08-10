# Full-Stack E-commerce Web Application

This project is a complete, full-stack e-commerce web application built with a Node.js backend and a React/Next.js frontend. It includes a public-facing storefront and a secure admin dashboard for managing the store.

## Technology Stack

*   **Monorepo:** [pnpm workspaces](https://pnpm.io/workspaces)
*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/)
    *   [PostgreSQL](https://www.postgresql.org/) (with `pg` driver)
    *   Authentication: [JSON Web Tokens (JWT)](https://jwt.io/)
    *   Password Hashing: [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
*   **Frontend:**
    *   [React](https://reactjs.org/)
    *   [Next.js](https://nextjs.org/) (App Router)
    *   [Tailwind CSS](https://tailwindcss.com/) for styling
    *   [TypeScript](https://www.typescriptlang.org/)

## Project Structure

The project is a monorepo with two main packages:

*   `./backend`: The Node.js/Express REST API server.
*   `./frontend`: The Next.js/React client application.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/en/download/) (v18 or later recommended)
*   [pnpm](https://pnpm.io/installation)
*   A running [PostgreSQL](https://www.postgresql.org/download/) database instance.

### 1. Installation

From the root directory, install all dependencies for both frontend and backend using pnpm:

```bash
pnpm install
```

### 2. Database Setup

1.  Create a new PostgreSQL database.
2.  Connect to your database and run the schema definition file to create all the necessary tables:
    ```bash
    psql -U your_username -d your_database_name -f backend/schema.sql
    ```
3.  You will also need to manually insert an admin user into the `admins` table to be able to log in.

### 3. Environment Variables

Navigate to the `backend` directory and create a `.env` file by copying the example:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your actual database connection URL and a secure JWT secret:

```
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST:5432/YOUR_DATABASE"
JWT_SECRET="generate-a-long-random-secure-string"
```

### 4. Running the Application

You can run both the frontend and backend servers concurrently from the root directory:

```bash
pnpm dev
```

*   The **Frontend** will be available at `http://localhost:3000`.
*   The **Backend API** will be available at `http://localhost:3001`.

## Admin Dashboard

*   **URL:** `http://localhost:3000/admin/login`
*   **Default Credentials (for mock data):**
    *   **Email:** `admin@maboutique.com`
    *   **Password:** `password123`

*(Note: These credentials are for the mock user in the backend code. For a real database setup, you must create an admin user manually as described in the database setup section.)*
