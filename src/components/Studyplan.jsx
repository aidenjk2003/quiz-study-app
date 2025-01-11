import React, { useState } from 'react';

function StudyPlan() {
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);

  // Add a new topic to the study plan
  const handleAddTopic = () => {
    if (!currentTopic || !dueDate) {
      setError('Both topic and due date are required.');
      return;
    }

    setError(null);
    setTopics([...topics, { id: Date.now(), topic: currentTopic, dueDate }]);
    setCurrentTopic('');
    setDueDate('');
  };

  // Remove a task when its checkbox is clicked
  const handleRemoveTopic = (id) => {
    const updatedTopics = topics.filter((item) => item.id !== id);
    setTopics(updatedTopics);
  };

  // Clear all tasks
  const handleClearPlan = () => {
    setTopics([]);
    setError(null);
  };

  return (
    <div>
      <h1 style={{marginLeft: '700px'}}>Study Plan</h1>
      <div>
        <label style={{marginLeft: '500px'}}>
          Topic:
          <input
            type="text"
            value={currentTopic}
            onChange={(e) => setCurrentTopic(e.target.value)}
            placeholder="Enter study topic"
          />
        </label>
        <label style={{marginLeft: '10px'}}>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <button onClick={handleAddTopic} style={{marginLeft: '10px'}}>Add Topic</button>
        <button onClick={handleClearPlan} style={{ marginLeft: '20px' }}>
          Clear Plan
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div >
        <h2 style={{marginLeft: "700px"}}>Your Study Plan</h2>
        {topics.length === 0 ? (
          <p style={{marginLeft: "625px"}}>No topics added yet. Start building your plan!</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {topics.map((item) => (
              <li key={item.id} style={{ marginBottom: '10px' }}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleRemoveTopic(item.id)}
                  />
                  <span style={{ marginLeft: '10px' }}>
                    <strong>{item.topic}</strong> - Due: {item.dueDate}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudyPlan;
