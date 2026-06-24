# 🍽️ Mess Portal

A modern, full-stack web application designed to streamline the management of student mess fees, notices, and payments.

## ✨ Features

### For Students
- **Dashboard**: Get a quick overview of your current dues, active notices, and recent payments.
- **Pay Dues**: Securely pay monthly mess fees via Razorpay integration.
- **Payment History**: Track all past transactions and download receipts.
- **Profile**: Manage your personal information and change your password securely.

### For Administrators
- **Dashboard**: View high-level metrics (total revenue, active students, defaulters, revenue breakdown).
- **Student Management**: Register, view, and manage student accounts.
- **Fee Cycles**: Create monthly fee cycles. *Supports batch-specific fee cycles* so different batches can have different due dates or amounts.
- **Dues Generation**: Automatically generate pending dues for all active students (or a specific batch) with a single click.
- **Payment Tracking**: View paid students, track defaulters, and review all system transactions.
- **Notices**: Broadcast announcements to the student dashboard with priority levels.

## 🛠️ Technology Stack

- **Frontend**: 
  - React (with Vite)
  - TailwindCSS for styling
  - shadcn/ui components (Radix UI)
  - React Query for data fetching & caching
  - Zustand for global state management
  - React Hook Form + Zod for form validation

- **Backend**:
  - Node.js & Express.js
  - MongoDB (Mongoose)
  - JWT for Authentication (HTTP-only cookies)
  - Razorpay SDK for payment processing
  - Joi for request validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account/connection string
- Razorpay account (for payment gateway API keys)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (refer to `.env.example` if available) and add your configurations:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   ACCESS_TOKEN_SECRET=your_jwt_access_secret
   REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
   ADMIN_EMAIL=admin@mess.com
   ADMIN_PASSWORD=your_admin_password
   ADMIN_NAME=Admin
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CORS_ORIGIN=http://localhost:5173
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🎨 Design

The UI has been overhauled with a vibrant, modern aesthetic featuring:
- Custom gradient backgrounds and text overlays
- Smooth, micro-animated card hover states
- Clean, colorful dashboard metrics (KPI cards)
- Seamless mobile and desktop responsive layouts

## 🔒 Security
- **Authentication**: Uses HTTP-only cookies to prevent XSS attacks.
- **Authorization**: Role-based access control (Student vs Admin) enforced via backend middleware.
- **Data Validation**: Comprehensive validation on both frontend (Zod) and backend (Joi).

## 📄 License
This project is proprietary.
