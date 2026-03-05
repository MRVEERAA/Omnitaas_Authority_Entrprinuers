# Omnitaas Login App – Full-Stack Login Application

This project is a **Full-Stack Login Application** built using **React (frontend)** and **Node.js with Express (backend)**.  

It fulfills the **Authority Entrepreneurs Technical Test** (Simple Mode) and also includes an extended **DB Auth Mode** for registered users.  

---

## ✅ Assignment Requirement – **Simple Mode**

The original assignment requires:

- **Login Page** with **username** and **password**  
- Backend API (`POST /login`) to validate credentials  
- Credentials: `admin/admin`  
- Navigate to **Welcome Page** on successful login  
- Display **error messages** for invalid credentials  
- Remember username for subsequent logins  

This is fully implemented in **Simple Mode**, satisfying the technical test requirements.

---

## 🌟 Additional Feature – **DB Auth Mode**

We extended the project with:

- **User Registration Page** for new users  
- Database authentication using **MongoDB Atlas**  
- **JWT Token Authentication** for logged-in DB users  
- Persistent login session in frontend state  
- Detailed error handling:
  - Missing fields → "All fields are required"  
  - Wrong username → "User not found"  
  - Wrong password → "Incorrect password"  
  - Duplicate username/email → "Username or Email already exists"

> **Note:** This is an extra feature beyond the original assignment.

---

## Features

- **Landing Page** – Select **Simple Mode** or **DB Auth Mode**  
- **Simple Mode Login** – Predefined credentials (`admin/admin`)  
- **DB Auth Login** – Register and login users with secure password hashing  
- **Welcome Page** – Shows username (Simple) or user info (DB Auth)  
- **Logout** – Clears session and redirects to landing page  
- **Modern UI/UX** – TailwindCSS, responsive and interactive  

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, React Hooks, React Router v6, TailwindCSS, Axios |
| Backend | Node.js, Express, CORS, bcrypt, JWT |
| Database | MongoDB Atlas |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MRVEERAA/Omnitaas_Authority_Entrprinuers.git
cd Omnitaas_Authority_Entrprinuers
