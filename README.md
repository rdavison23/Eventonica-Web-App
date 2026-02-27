# Eventonica

Full‑Stack Events Manager week 9

Eventonica is a full‑stack CRUD application for managing events.
It includes a React frontend with client‑side routing and reducer‑based state management, and a Node.js + Express + PostgreSQL backend that exposes a REST API.

This project demonstrates clean architecture, modern React patterns, and a fully functional API layer.

# Overview

- Create new events
- Edit event fields inline
- Save updates to the backend
- Delete events
- Mark events as favorites
- Navigate between pages using React Router

# Tech Stack

Frontend

- React
- React Router
- useReducer for state management
- Fetch API
- CSS
- Frontend runs at:http://localhost:5173

Backend

- Node.js
- Express
- PostgreSQL
- pg (connection pool)
- dotenv
- CORS
- Backend runs at: http://localhost:3000

# React Router Setup

- app.jsx Browser Router
- Home Page: Simple landing page with navigation
- Events Page (CRUD UI)

The Events page uses:

- useReducer for event state
- useEffect to load events
- Inline editing for each event
- A separate “New Event” row for creating events
