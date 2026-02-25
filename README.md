# ApplyCheck - Professional Resume Builder

ApplyCheck is a modern, full-stack resume builder designed to help users create ATS-friendly, professional resumes with ease. The application features a dynamic form-based builder on the left and a live-updating professional preview on the right.

## Features

- **Live Preview**: Real-time visualization of your resume as you type.
- **Structured Sections**: Support for Personal Info, Education, Internships, Projects, Leadership & Achievements, and Skills.
- **ATS-Friendly Design**: Uses a clean, professional layout with the "Open Sans" font family.
- **PDF Export**: Generate high-quality PDF versions of your resume with a single click.
- **Data Persistence**: Save your resume data to a database for future editing.
- **Dark/Light Mode**: User-friendly theme switching.

## Tech Stack

- **Frontend**: React, Vite, Bootstrap, Axios, html2pdf.js
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Styling**: Vanilla CSS, Bootstrap

---

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or a MongoDB Atlas URI)

---

## Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone <repository-url>
cd ApplyCheck
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/applycheck  # Or your Atlas URI
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

---

## Running the Application

You will need to run the backend and frontend in separate terminals.

### Start the Backend
```bash
cd backend
npm run dev
```
The server will start on [http://localhost:5000](http://localhost:5000).

### Start the Frontend
```bash
cd frontend
npm run dev
```
The application will be available at [http://localhost:5173](http://localhost:5173).

---

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
