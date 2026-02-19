# 💸 FinancePro - Modern Personal Finance Tracker

A sleek, ultra-responsive personal finance application designed to help users track their network balance, monitor transaction flow, and gain deep financial insights. Built with React, Tailwind CSS, Framer Motion, and Firebase.

![FinancePro Preview](https://via.placeholder.com/800x400?text=FinancePro+Dashboard+Preview) ## ✨ Key Features

* **Secure Authentication:** Email/Password and Google OAuth login via Firebase Authentication, complete with a secure password recovery protocol.
* **Real-Time Data:** Instant synchronization of income and expense transactions using Cloud Firestore.
* **Dynamic Dashboard:** Automatically calculates "Network Balance," "Total Inflow," and "Total Outflow."
* **Deep Insights:** Advanced analytics and filtering by transaction category (Salary, Food & Dining, Rent, etc.).
* **Fluid Animations:** Smooth layout shifts, pop-outs, and page transitions powered by Framer Motion.
* **Responsive UI:** Mobile-first design that looks perfect on smartphones, tablets, and desktop displays.
* **Theme Engine:** Seamless toggling between a modern Light Mode and a sleek, cyber-glass Dark Mode.

## 🛠️ Tech Stack

* **Frontend Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Animations:** Framer Motion
* **Backend & Database:** Firebase (Authentication, Firestore)
* **Routing:** React Router DOM
* **Hosting:** Vercel

---

## 📂 File Directory Structure

```text
personal-finance-tracker/
├── public/
│   └── vite.svg
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
