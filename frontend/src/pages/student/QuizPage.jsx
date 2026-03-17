import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';

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
  const { user } = useAuth();
  const quiz = useMemo(() => mockQuizzesData[quizId] || mockQuizzesData[1], [quizId]);

  return <QuizInner key={quizId} quiz={quiz} userName={user?.name} />;
};

const QuizInner = ({ quiz, userName }) => {
  const [answers, setAnswers] = useState(() => new Array(quiz.questions.length).fill(null));
  const [result, setResult] = useState(null);
  const [startedAt] = useState(() => Date.now());
  const [reviewMode, setReviewMode] = useState(false);

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
    setReviewMode(true);
  };

  const answeredCount = useMemo(() => answers.filter((a) => a !== null).length, [answers]);
  const remainingCount = quiz.questions.length - answeredCount;
  const startedLabel = useMemo(() => new Date(startedAt).toLocaleString(), [startedAt]);

  return (
    <div className="quiz-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Quiz</p>
          <h2 className="mycourses-hero__title">
            {quiz.title}
            {userName ? ` · ${userName}` : ''}
          </h2>
          <p className="muted mycourses-hero__subtitle">
            Timed MCQ assessment — answers save into results, analytics, and mastery tracking in a
            real LMS.
          </p>
        </div>

        <div className="mycourses-hero__right">
          <div className="quiz-summary">
            <div className="quiz-summary__row">
              <span className="muted">Duration</span>
              <span className="pill pill--filter">{quiz.durationMinutes} mins</span>
            </div>
            <div className="quiz-summary__row">
              <span className="muted">Questions</span>
              <span className="pill pill--filter">{quiz.questions.length}</span>
            </div>
            <div className="quiz-summary__row">
              <span className="muted">Answered</span>
              <span className="pill pill--success">{answeredCount}</span>
            </div>
            <div className="quiz-summary__row">
              <span className="muted">Remaining</span>
              <span className="pill pill--filter">{remainingCount}</span>
            </div>
            <div className="quiz-summary__row">
              <span className="muted">Elapsed</span>
              <span className="pill pill--filter">Started: {startedLabel}</span>
            </div>
          </div>

          <div className="dashboard-pills">
            <span className="pill pill--filter">Auto-save answers</span>
            <span className="pill pill--filter">Review mode</span>
            <span className="pill pill--filter">Certificate ready</span>
          </div>
        </div>
      </header>

      <section className="quiz-layout">
        <div className="quiz-questions">
          {quiz.questions.map((q, index) => (
            <div key={q.id} className={`card quiz-question ${reviewMode ? 'quiz-question--review' : ''}`}>
              <div className="quiz-question__top">
                <p className="quiz-question__number muted">Question {index + 1}</p>
                <span className={`pill ${answers[index] !== null ? 'pill--success' : 'pill--filter'}`}>
                  {answers[index] !== null ? 'Answered' : 'Not answered'}
                </span>
              </div>
              <p className="quiz-question__text">{q.question}</p>
              <div className="quiz-options">
                {q.options.map((opt, optIndex) => (
                  <label key={optIndex} className="quiz-option">
                    <input
                      type="radio"
                      name={`q${index}`}
                      checked={answers[index] === optIndex}
                      disabled={reviewMode}
                      onChange={() =>
                        setAnswers((prev) => {
                          const next = [...prev];
                          next[index] = optIndex;
                          return next;
                        })
                      }
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside className="card dashboard-panel quiz-side">
          <div className="dashboard-panel__header">
            <div>
              <h3>Submission</h3>
              <p className="muted">Before submitting, ensure all questions are answered.</p>
            </div>
          </div>

          <ul className="mycourses-checklist" aria-label="Quiz checklist">
            <li className="mycourses-check">
              <span className="dot dot--info" aria-hidden="true" />
              <div>
                <strong>Answer all questions</strong>
                <p className="muted">Unanswered questions reduce your score.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--warning" aria-hidden="true" />
              <div>
                <strong>Time awareness</strong>
                <p className="muted">Aim to finish within {quiz.durationMinutes} minutes.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--primary" aria-hidden="true" />
              <div>
                <strong>Review mode</strong>
                <p className="muted">After submit, answers lock for review.</p>
              </div>
            </li>
          </ul>

          <div className="dashboard-panel__footer">
            <button className="btn btn--primary btn--small" type="button" onClick={submitQuiz} disabled={reviewMode}>
              {reviewMode ? 'Submitted' : 'Submit quiz'}
            </button>
            <button
              className="btn btn--ghost btn--small"
              type="button"
              onClick={() => {
                setAnswers(new Array(quiz.questions.length).fill(null));
                setResult(null);
                setReviewMode(false);
              }}
            >
              Reset attempt
            </button>
          </div>

          {result && (
            <div className="quiz-result card">
              <h3>Result</h3>
              <p className="quiz-result__score">
                Score: <strong>{result.score}</strong> / {result.total} ({result.percentage}%)
              </p>
              <p className="muted">
                In a full LMS, this would unlock certificates, update mastery, and notify instructors.
              </p>
            </div>
          )}
        </aside>
      </section>
      {result && (
        <div className="card quiz-review-note">
          <h3>Review mode enabled</h3>
          <p className="muted">
            Your selections are locked. In a real system, you would see correct answers + explanations here.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

