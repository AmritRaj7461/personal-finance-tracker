# 💸 FinancePro - Modern Personal Finance Tracker

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](#)

A sleek, ultra-responsive personal finance application designed to help users track their network balance, monitor transaction flow, and gain deep financial insights. Built with React, Tailwind CSS, Framer Motion, and Firebase.

![FinancePro Dashboard](./public/dashboard-preview.png)
*(Save a screenshot of your app as `dashboard-preview.png` in your `public` folder to display it here!)*

## ✨ Key Features

* **Secure Authentication:** Email/Password and Google OAuth login via Firebase Authentication, complete with a secure password recovery protocol.
* **Real-Time Data Flow:** Instant synchronization of income and expense transactions using Cloud Firestore listeners. No page refreshes needed.
* **Dynamic Dashboard:** Automatically calculates "Network Balance," "Total Inflow," and "Total Outflow" based on your personal transaction history.
* **Deep Insights & Analytics:** Advanced filtering by transaction category (Salary, Food & Dining, Rent, etc.) and visual data representation.
* **Fluid Animations:** Smooth layout shifts, pop-outs, and page transitions powered by Framer Motion.
* **Ultra-Responsive UI:** Mobile-first design that looks perfect on smartphones, tablets, and desktop displays without breaking flexbox containers.
* **Theme Engine:** Seamless toggling between a modern Light Mode and a sleek, cyber-glass Dark Mode.

## 🛠️ Tech Stack

* **Frontend Framework:** React 18 (Bootstrapped with Vite for extreme performance)
* **Styling:** Tailwind CSS (Utility-first custom styling)
* **Icons:** Lucide React
* **Animations:** Framer Motion (PopLayout and AnimatePresence)
* **Backend & Database:** Firebase (Authentication, Firestore NoSQL Database)
* **Routing:** React Router DOM v6
* **Hosting:** Vercel

---

## 📂 File Directory Structure

```text
personal-finance-tracker/
├── public/
│   ├── vite.svg
│   └── dashboard-preview.png   # Repo screenshot
├── src/
│   ├── assets/             # Static assets (images, global CSS)
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Top navigation and theme toggle
│   │   ├── SummaryCards.jsx# Network Balance and Inflow/Outflow stats
│   │   ├── TransactionForm.jsx # Form to add new records
│   │   └── TransactionList.jsx # Filterable, animated list of transactions
│   ├── firebase/
│   │   └── config.js       # Firebase initialization and service exports
│   ├── hooks/
│   │   ├── useCollection.js# Custom hook for real-time Firestore listeners
│   │   ├── useLogin.js     # Custom hook for auth logic
│   │   └── useSignup.js    # Custom hook for registration logic
│   ├── pages/
│   │   ├── Dashboard.jsx   # Main application view
│   │   ├── Login.jsx       # User authentication portal
│   │   └── Signup.jsx      # User registration portal
│   ├── App.jsx             # Main routing and layout wrapper
│   └── main.jsx            # React entry point
├── .env                    # Environment variables (IGNORED IN GIT)
├── .gitignore              # Ignored files and directories
├── index.html              # Vite HTML template
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
