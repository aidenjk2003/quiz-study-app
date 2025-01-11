import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <h1 style={{marginLeft: '400px'}}>Welcome to the Study Guide Generator</h1>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="/study-plan" style={{marginLeft: '700px'}}>Generate Study Plan</Link>
          </li>
          <li>
            <Link to="/quiz-form" style={{marginLeft: '725px'}}>Generate Quiz</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
