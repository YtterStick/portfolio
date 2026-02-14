# Full Stack Portfolio Website

A modern, futuristic portfolio website built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
-   **Futuristic UI**: Dark theme, glassmorphism, and Framer Motion animations.
-   **Admin Dashboard**: Manage projects and inquiries securely.
-   **Dynamic Content**: Projects and Inquiries are stored in MongoDB.
-   **Email Notifications**: Receive emails when someone contacts you.
-   **Responsive Design**: Mobile-first approach using Tailwind CSS.

## Tech Stack
-   **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios, React Router.
-   **Backend**: Node.js, Express, Mongoose (MongoDB), JWT, Nodemailer.

## Setup Instructions

### Prerequisites
-   Node.js installed.
-   MongoDB Atlas account (or local MongoDB).

### 1. Clone the Repository
```bash
git clone <repository-url>
cd portfolio
```

### 2. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory with the following variables:
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    ADMIN_EMAIL=your_email@example.com
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup
1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Deployment

### Frontend (Vercel)
1.  Push client code to GitHub.
2.  Import project into Vercel.
3.  Set Output Directory to `dist` (Vite default).
4.  Deploy.

### Backend (Render/Railway)
1.  Push server code to GitHub.
2.  Import project into Render/Railway.
3.  Set Build Command: `npm install`
4.  Set Start Command: `node index.js`
5.  Add Environment Variables in the dashboard.

## Admin Login (Mock/Seed)
-   The initial setup includes a mock login in `AuthContext` for demonstration if backend is not connected.
-   To rely on backend, uncomment the axios calls in `AuthContext.jsx` and use the register route (via Postman) to create your first admin.
-   **Default Mock Credentials**:
    -   Email: `admin@example.com`
    -   Password: `password`
