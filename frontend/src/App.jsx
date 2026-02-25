import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ResumeForm from './components/ResumeForm';
import AnalysisDashboard from './components/AnalysisDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <Router>
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<ResumeForm />} />
              <Route path="/analyze" element={<AnalysisDashboard />} />
            </Routes>
          </div>
        </Router>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;
