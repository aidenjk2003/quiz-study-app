import React, { useState } from 'react';
function QuizForm() {

  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('Medium');
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateQuiz = async () => {
    try {
      setError(null);
      setResults(null); // Clear previous results
      if(numQuestions<=0){
        setError('Please add a positive value to the number of questions.')
        return;
      }

      if (!topic || !numQuestions || !difficulty) {
        setError('Please provide valid inputs for topic, number of questions, and difficulty.');
        return;
      }

      const payload = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a quiz generator.' },
          {
            role: 'user',
            content: `Generate ${numQuestions} multiple-choice questions on the topic of ${topic} with ${difficulty} difficulty. Each question should include 4 options and indicate the correct answer. Format the response as a valid JSON array of objects. Each object should have the following structure:
            
            {
              "question": "Question text",
              "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
              "answer": "Correct option text"
            }`,
          },
        ],
        max_tokens: 1500,
      };
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Authorization': `Bearer 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`,
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      let rawContent = data.choices[0].message.content.trim();

      if (rawContent.startsWith('```')) {
        rawContent = rawContent.replace(/```(?:json)?/g, '').trim();
      }

      const parsedContent = JSON.parse(rawContent);
      setQuiz(parsedContent);
    } catch (error) {
      console.error('Error:', error.message);
      setError(`Failed to generate quiz: ${error.message}`);
    }
  };

  const handleSelectAnswer = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = () => {
    const correctAnswers = quiz.map((q, index) => ({
      question: q.question,
      correctAnswer: q.answer,
      userAnswer: selectedAnswers[index],
      isCorrect: selectedAnswers[index] === q.answer,
    }));
    setResults(correctAnswers);
  };

  return (
    <div>
      <h1 style={{marginLeft: '650px'}}>Create a Quiz</h1>
      <div>
        <label style={{marginLeft: '400px'}}>
          Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
        <label style={{marginLeft:'10px'}}>
          Number of Questions:
          <input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
          />
        </label>
        <label style={{marginLeft:'10px'}}>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <button onClick={handleGenerateQuiz} style={{marginLeft:'20px'}}>Generate Quiz</button>
      </div>

      {error && <p style={{ color: 'red', marginLeft: '550px' }}>{error}</p>}

      <div>
        <h2 style={{marginLeft:'650px'}}>Generated Quiz</h2>
        {quiz.map((question, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p style={{marginLeft:'500px', color: '#535bf2'}}>{question.question}</p>
            {question.options.map((option, i) => (
              <button 
                key={i}
                onClick={() => handleSelectAnswer(index, option)}
                style={{
                  marginLeft:'200px',
                  backgroundColor:
                    selectedAnswers[index] === option ? '#d3d3d3' : '#fff',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        ))}
      </div>

      {quiz.length > 0 && (
        <button onClick={handleSubmit} style={{ marginLeft: '700px' }}>
          Submit Quiz
        </button>
      )}

      {results && (
        <div>
          <h2>Results</h2>
          {results.map((result, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <p>
                <strong>Question:</strong> {result.question}
              </p>
              <p>
                <strong>Your Answer:</strong> {result.userAnswer || 'Not answered'}
              </p>
              <p>
                <strong>Correct Answer:</strong> {result.correctAnswer}
              </p>
              <p
                style={{
                  color: result.isCorrect ? 'green' : 'red',
                }}
              >
                {result.isCorrect ? 'Correct' : 'Incorrect'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizForm;
