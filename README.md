# HRMS Platform (React + Next.js)

A modern Human Resource Management System built with React, Next.js, and Tailwind CSS.

## 🔧 Tech Stack

- **Frontend Framework:** React
- **Build Tool:** Next.js
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** Next.js File-based routing
- **API Communication:** Axios
- **Form Handling:** React Hook Form

## 📁 Project Structure

```
HRMS-APP/
├── src/                   # Source directory
│   ├── app/               # Next.js App Router
│   │   ├── admin/         # Admin dashboard routes
│   │   ├── components/    # Reusable UI components
│   │   ├── slices/        # Redux slices
│   │   ├── user/          # User dashboard routes
│   │   ├── layout.js      # Root layout
│   │   ├── page.js        # Home page
│   │   ├── store.js       # Redux store configuration
│   │   └── globals.css    # Global styles
│   └── services/          # API services and utilities
├── public/                # Static files
├── node_modules/          # Dependencies
├── next.config.mjs        # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── eslint.config.mjs      # ESLint configuration
└── jsconfig.json          # JavaScript configuration
```

## Getting Started

1. **Clone the repository**
```bash
git clone [repository-url]
cd HRMS-APP
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📋 Features

### Admin Dashboard
- Employee profile management
  - View and manage employee profiles
  - Update employee information
  - Track employee records
- Leave management system
  - Review all leave applications
  - Approve, reject, or recall leaves
  - Monitor leave balances
- Employee data management
  - Add/remove employees
  - Manage roles and permissions
  - Track attendance
- Administrative dashboard widgets
  - Employee statistics
  - Leave statistics
  - Department overview
  - Recent activities

### User Dashboard
- Leave Management
  - Apply for leave
  - Track leave status (Pending/Approved/Rejected)
  - View leave balance
  - Leave history
- Task Management
  - Create and update tasks
  - Mark tasks as completed
  - Set task priorities
  - Track task progress
- Dashboard Widgets
  - Birthday reminders
  - Company announcements
  - To-do lists
  - Leave summary
  - Notifications
  - Upcoming events

### Common Features
- Secure authentication system
- Role-based access control
- Responsive design
- Dynamic routing based on user role
- Real-time notifications
- Profile management

## 🔐 Authentication

The application implements secure authentication using [Authentication Provider]. Protected routes ensure that users can only access authorized sections based on their role.

## 📱 Responsive Design

The UI is fully responsive and optimized for:
- Desktop computers
- Tablets

## 🛠️ Development

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint