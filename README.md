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

## 🌍 Deployment (Railway)

This application is deployed on **Railway** as two services:

- **Frontend (Vue + Vite)**: root directory set to `frontend`
- **Backend (Node + Express + SQLite)**: root directory set to `backend`

---

### 🚀 Backend Deployment (Railway)
**Deployment Steps:**
1. Create a new project on Railway.
2. Connect the GitHub repository.
3. Select the backend service.
4. Set the start command:

```bash
npm start
```
5. Configure environment variables if required.
6. Deploy the service.

After deployment, Railway provides a public backend URL, for example:
> https://notes-file-manager-production.up.railway.app

---

### 🚀 Frontend Deployment (Railway)
**Deployment Steps:**
1. Add a new service in the same Railway project.
2. Connect the frontend folder from the GitHub repository.
3. Set the build command:

```bash
npm install && npm run build
```

4. Set the start command:

```bash
npm run preview -- --host 0.0.0.0 --port $PORT
```
5. Configure the environment variable for the backend API URL.
6. Deploy the frontend service.

Railway will generate a public URL for the frontend, for example:
>https://site-production-fbbb.up.railway.app

---

### 🔗 Environment Variables

The frontend is configured to communicate with the deployed backend API using an environment variable.

Example VITE_API_BASE_URL:
>https://notes-file-manager-production.up.railway.app

---

## 🔗 API Endpoints

All backend routes are prefixed with `/api`.

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/notes`        | Retrieve all notes   |
| GET    | `/api/notes/:id`    | Retrieve a note by ID |
| POST   | `/api/notes`        | Create a new note    |
| PUT    | `/api/notes/:id`    | Update a note        |
| DELETE | `/api/notes/:id`    | Delete a note        |

---

## ✅ Conclusion

This project is fully deployed using **Railway** and demonstrates:
- A cloud-hosted Vue.js frontend
- A RESTful Node.js backend
- Persistent SQLite database storage
- End-to-end CRUD functionality accessible via public URLs

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
