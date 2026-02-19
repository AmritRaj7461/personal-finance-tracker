<div align="center">

# 💸 **FINANCEPRO**
### *The Ultimate Cyber-Aesthetic Personal Finance Tracker*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](#)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](#)

> A sleek, ultra-responsive web application designed to track network balance,  
> monitor transaction flow, and deliver deep financial insights — wrapped in a  
> premium cyber-glass UI.

[🐞 Report Bug](https://github.com/AmritRaj7461/personal-finance-tracker/issues) ·  
[✨ Request Feature](https://github.com/AmritRaj7461/personal-finance-tracker/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [File Directory Structure](#-file-directory-structure)
- [Contact](#-contact)

---

## 🚀 About the Project

Most personal finance apps feel like dull spreadsheets. **FinancePro** was built  
to break that pattern.

With a futuristic **Cyber-Glass UI**, fluid animations, and real-time updates,  
FinancePro turns everyday expense tracking into a smooth, premium experience.  
Whether you’re checking your **Network Balance** on desktop or logging a coffee  
expense on mobile, everything stays fast, responsive, and visually satisfying.

---

## ✨ Key Features

### 🛡️ Core System
- Secure authentication with Email/Password and Google OAuth  
- Password recovery support  
- Real-time Firestore synchronization with zero manual refresh  

### 📊 Data & Analytics
- Live Network Balance, Total Inflow, and Total Outflow  
- Category-based filtering (Salary, Food, Rent, Bills, etc.)  
- Instant transaction search and smart filters  

### 🎨 UI & UX
- Smooth Framer Motion animations  
- Fully responsive, mobile-first design  
- Light mode and immersive Cyber-Glass dark mode  

---

## 🛠️ Tech Stack

### Client-Side
- [React 18](https://react.dev/) (Vite)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [React Router v6](https://reactrouter.com/)

### Backend / BaaS
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Cloud Firestore](https://firebase.google.com/products/firestore)
- [Vercel](https://vercel.com/) (Deployment)

---

## 🏁 Getting Started

### Prerequisites
Ensure Node.js and npm are installed.

```sh
npm install npm@latest -g

git clone https://github.com/AmritRaj7461/personal-finance-tracker.git
cd personal-finance-tracker
npm install
npm run dev
```

---

## 📂 File Directory Structure

```text
personal-finance-tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/              # Global styles & static assets
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── TransactionForm.jsx
│   │   └── TransactionList.jsx
│   ├── firebase/
│   │   └── config.js        # Firebase configuration
│   ├── hooks/
│   │   ├── useCollection.js
│   │   ├── useLogin.js
│   │   └── useSignup.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── App.jsx              # Routing & theme provider
│   └── main.jsx             # Application entry point
├── .env                     # Environment variables
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📬 Contact

For collaborations, feedback, or professional opportunities,  
feel free to connect.

- **Name:** Amrit Raj  
- **LinkedIn:** https://www.linkedin.com/in/amrit-raj7461/  
- **Email:** amritraj7461@gmail.com
