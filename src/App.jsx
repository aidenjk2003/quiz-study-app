import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust path as needed
import Home from './components/Home';
import QuizForm from './components/QuizForm';
import StudyPlan from './components/StudyPlan';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '60px' }}> {/* Prevent overlapping */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz-form" element={<QuizForm />} />
          <Route path="/study-plan" element={<StudyPlan />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
