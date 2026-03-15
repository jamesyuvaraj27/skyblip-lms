import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const QuizPage = () => {
  const { quizId } = useParams();
  const { token, apiBase } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`${apiBase}/api/quizzes/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setQuiz(data);
      setAnswers(new Array(data.questions.length).fill(null));
    };
    if (token && quizId) fetchQuiz();
  }, [apiBase, quizId, token]);

  const submitQuiz = async () => {
    const res = await fetch(`${apiBase}/api/quizzes/${quizId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    setResult(data);
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div className="quiz-page">
      <header className="dashboard-header">
        <div>
          <h2>{quiz.title}</h2>
          <p className="muted">
            Timed MCQ quiz linked to your course. Answers are stored as quiz results in the
            backend.
          </p>
        </div>
        <div className="quiz-meta">
          <span className="pill pill--filter">{quiz.durationMinutes} minutes</span>
          <span className="pill pill--filter">{quiz.questions.length} questions</span>
        </div>
      </header>
      <div className="quiz-questions">
        {quiz.questions.map((q, index) => (
          <div key={q.id} className="card quiz-question">
            <p>{q.question}</p>
            <div className="quiz-options">
              {q.options.map((opt, optIndex) => (
                <label key={optIndex}>
                  <input
                    type="radio"
                    name={`q${index}`}
                    checked={answers[index] === optIndex}
                    onChange={() =>
                      setAnswers((prev) => {
                        const next = [...prev];
                        next[index] = optIndex;
                        return next;
                      })
                    }
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn--primary" onClick={submitQuiz}>
        Submit quiz
      </button>
      {result && (
        <div className="quiz-result">
          <h3>Result</h3>
          <p>
            Score: {result.score} / {result.total}
          </p>
          <p className="muted">
            In the full system, this would also unlock certificates and feed into analytics and
            progress tracking collections.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

