Knowledge Tracker Assignment


* Overview

This project is a Knowledge Tracker App . It allows users to create, edit, delete, and filter notes related to learning resources. The app is a full-stack solution with a Next.js frontend and a Spring Boot backend integrated with an H2 database.


* Tech Stack

1 :Frontend: Next.js, React, Tailwind CSS

2 :Backend: Spring Boot (Java)

3 :Database: H2 (in-memory)

4 :API Communication: REST APIs (GET, POST, PUT, DELETE)


* How to Run

Frontend (Next.js)

Navigate to the frontend folder.

Install dependencies:

npm install

Start the development server:

npm run dev

The app will run at http://localhost:3000.

Backend (Spring Boot)

Navigate to the backend folder.

Run the application using Gradle:


The backend will run at http://localhost:8080.



* Features

Dashboard:

List all notes

Search by title

Filter by category and status

Edit and delete notes

Create Page: Add new notes

Edit Page: Update existing notes

Integration: Frontend communicates with backend via REST APIs

Error Handling & Loading States: Added for better UX

Styling: Tailwind CSS for clean UI

* Architecture Decisions

Frontend State Management: Local state with React hooks (simple and lightweight).

Backend Architecture: Layered approach (Controller → Service → Repository).

Database Choice: H2 in-memory DB for simplicity and easy testing.

API Design: RESTful, stateless endpoints.

* Trade-offs

No authentication implemented (focus on CRUD functionality).

Basic error handling (could be improved with toast notifications).



* Possible Improvements


Use persistent database (MySQL/PostgreSQL).

Improve UI with reusable components (e.g., NoteCard).

