# 📂 Simple File Management System (Notes App)

## 📌 Project Overview

This project is a **Simple File Management System** that allows users to manage text-based notes consisting of a **title** and **content**.  
It demonstrates full **CRUD (Create, Read, Update, Delete)** functionality through a web-based interface.

The system is built using **Vue.js** for the frontend and **Node.js with Express** for the backend, with **SQLite** used as a lightweight, file-based database.  
The UI follows a **clean and minimal design**, focusing on clarity, usability, and core functionality.

---

## 🛠️ Tech Stack

### Frontend
- Vue.js 
- JavaScript 
- Vite
- HTML5 & CSS3

### Backend
- Node.js
- Express.js
- RESTful API

### Database
- SQLite (file-based)

---

## ✨ Features

- ➕ Create notes with a title and content  
- 📋 View all notes in a list/card layout  
- ✏️ Edit existing notes  
- 🗑️ Delete notes with a confirmation dialog  
- 💾 Persistent data storage using SQLite  
- 🌐 RESTful communication between frontend and backend  

---

## 🚀 How to Run Locally

### 1️⃣ Backend Setup
```bash
cd backend
npm install
npm start
```
> Backend server runs at: http://localhost:3000

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
> Frontend runs at: http://localhost:5173

## 🌍 Deployment Process

- **Frontend:** Deployed using Railway
- **Backend:** Deployed using Railway   

---

## 🤖 Development Process (AI Usage)

### Example 1

**Prompt:**  
Generate a simple Vue.js CRUD interface for a note management application.

**AI Output:**  
Provided a basic Vue component with a form and list layout.

**My Modifications:**
- Refactored UI into reusable components (`NoteCard`, `NoteModal`)
- Connected frontend to Express REST API
- Added delete confirmation dialog

**Reason:**  
To improve code organization and user experience while keeping the UI minimal.

---

### Example 2

**Prompt:**  
Create a basic Express.js REST API using SQLite for CRUD operations.

**AI Output:**  
Generated sample routes and database logic.

**My Modifications:**
- Added input validation using `validate.js`
- Improved error handling
- Structured API for frontend integration

**Reason:**  
To ensure data integrity and reliable backend behavior.

---


