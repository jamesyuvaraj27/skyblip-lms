import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Mock quizzes data
const mockQuizzesData = {
  1: {
    id: 1,
    title: 'Arrays Basics Quiz',
    durationMinutes: 15,
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of accessing an element by index in an array?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)']
      },
      {
        id: 2,
        question: 'Which method adds an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()']
      },
      {
        id: 3,
        question: 'What is the index of the first element in an array?',
        options: ['1', '0', '-1', 'undefined']
      }
    ]
  },
  2: {
    id: 2,
    title: 'Strings Advanced Quiz',
    durationMinutes: 20,
    questions: [
      {
        id: 4,
        question: 'Are strings in JavaScript mutable?',
        options: ['Yes', 'No', 'Sometimes', 'It depends']
      },
      {
        id: 5,
        question: 'How do you find the length of a string?',
        options: ['str.size', 'str.length', 'len(str)', 'str.count']
      }
    ]
  }
};

const QuizPage = () => {
  const { quizId } = useParams();
  const { token } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Mock fetch - no backend call
    const mockQuiz = mockQuizzesData[quizId] || mockQuizzesData[1];
    setQuiz(mockQuiz);
    setAnswers(new Array(mockQuiz.questions.length).fill(null));
  }, [quizId, token]);

  const submitQuiz = async () => {
    // Mock submission - no backend call
    const scoreCount = answers.filter((ans) => ans !== null).length;
    const totalQuestions = quiz.questions.length;
    const mockResult = {
      score: scoreCount,
      total: totalQuestions,
      percentage: Math.round((scoreCount / totalQuestions) * 100)
    };
    setResult(mockResult);
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div className="quiz-page">
      <header className="dashboard-header">
        <div>
          <h2>{quiz.title}</h2>
          <p className="muted">
            Timed MCQ quiz linked to your course. Answers are stored as quiz results in the
            frontend.
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
            Score: {result.score} / {result.total} ({result.percentage}%)
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

