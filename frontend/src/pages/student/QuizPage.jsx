import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from './studentData.js';
import './QuizPage.css';

const formatTimer = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.max(totalSeconds % 60, 0)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const QuizPage = () => {
  const { quizId } = useParams();
  const quiz = useMemo(() => getQuizById(quizId) ?? getQuizById('q1'), [quizId]);

  const [answers, setAnswers] = useState(() => new Array(quiz.questions.length).fill(null));
  const [reviewMode, setReviewMode] = useState(false);
  const [result, setResult] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(() => quiz.durationMinutes * 60);
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    if (reviewMode) return undefined;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [reviewMode]);

  const answeredCount = useMemo(() => answers.filter((answer) => answer !== null).length, [answers]);
  const remainingCount = quiz.questions.length - answeredCount;
  const startedLabel = useMemo(() => new Date(startedAt).toLocaleString(), [startedAt]);

  const submitQuiz = () => {
    const evaluated = evaluateResult(quiz, answers);
    setResult(evaluated);
    setReviewMode(true);
  };

  const resetAttempt = () => {
    setAnswers(new Array(quiz.questions.length).fill(null));
    setResult(null);
    setReviewMode(false);
    setSecondsLeft(quiz.durationMinutes * 60);
  };

  return (
    <div className="quiz-page">
      <header className="mycourses-hero">
        <div>
          <p className="dashboard-hero__eyebrow">Assessment center</p>
          <h2 className="mycourses-hero__title">{quiz.title}</h2>
          <p className="muted mycourses-hero__subtitle">
            Timed checkpoint with question-by-question review, explanations, and pass/fail analytics.
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
              <span className="muted">Timer</span>
              <span className={`pill ${secondsLeft < 120 && !reviewMode ? 'pill--warning' : 'pill--filter'}`}>
                {formatTimer(secondsLeft)}
              </span>
            </div>
            <div className="quiz-summary__row">
              <span className="muted">Started</span>
              <span className="pill pill--filter">{startedLabel}</span>
            </div>
          </div>

          <div className="dashboard-pills">
            <span className="pill pill--filter">Auto-save answers</span>
            <span className="pill pill--filter">Review with explanations</span>
            <span className="pill pill--filter">Pass mark {quiz.passPercent}%</span>
          </div>
        </div>
      </header>

      <section className="quiz-layout">
        <div className="quiz-questions">
          {quiz.questions.map((question, index) => {
            const selected = answers[index];
            const isCorrect = selected === question.correctIndex;

            return (
              <article
                key={question.id}
                className={`card quiz-question ${reviewMode ? 'quiz-question--review' : ''}`}
              >
                <div className="quiz-question__top">
                  <p className="quiz-question__number muted">Question {index + 1}</p>
                  <span
                    className={`pill ${
                      selected === null
                        ? 'pill--filter'
                        : reviewMode
                          ? isCorrect
                            ? 'pill--success'
                            : 'pill--hard'
                          : 'pill--success'
                    }`}
                  >
                    {selected === null ? 'Not answered' : reviewMode ? (isCorrect ? 'Correct' : 'Incorrect') : 'Answered'}
                  </span>
                </div>

                <p className="quiz-question__text">{question.question}</p>

                <div className="quiz-options">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = answers[index] === optionIndex;
                    const isAnswer = optionIndex === question.correctIndex;

                    const optionClass = reviewMode
                      ? isAnswer
                        ? 'quiz-option quiz-option--correct'
                        : isSelected
                          ? 'quiz-option quiz-option--wrong'
                          : 'quiz-option'
                      : 'quiz-option';

                    return (
                      <label key={`${question.id}-${option}`} className={optionClass}>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          checked={isSelected}
                          disabled={reviewMode || secondsLeft === 0}
                          onChange={() =>
                            setAnswers((prev) => {
                              const next = [...prev];
                              next[index] = optionIndex;
                              return next;
                            })
                          }
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>

                {reviewMode && (
                  <div className="quiz-explanation">
                    <p className="stat-label">Explanation</p>
                    <p className="muted">{question.explanation}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <aside className="card dashboard-panel quiz-side">
          <div className="dashboard-panel__header">
            <div>
              <h3>Submission</h3>
              <p className="muted">Validate all answers before final submit.</p>
            </div>
          </div>

          <div className="quiz-nav-grid" aria-label="Question navigator">
            {quiz.questions.map((question, index) => {
              const selected = answers[index];
              const navClass = selected === null ? 'pill pill--filter' : 'pill pill--success';
              return (
                <button key={question.id} type="button" className={navClass}>
                  Q{index + 1}
                </button>
              );
            })}
          </div>

          <ul className="mycourses-checklist" aria-label="Quiz checklist">
            <li className="mycourses-check">
              <span className="dot dot--info" aria-hidden="true" />
              <div>
                <strong>Answer all questions</strong>
                <p className="muted">Unanswered questions reduce final percentage.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--warning" aria-hidden="true" />
              <div>
                <strong>Watch the timer</strong>
                <p className="muted">Auto-submit triggers when timer reaches zero.</p>
              </div>
            </li>
            <li className="mycourses-check">
              <span className="dot dot--primary" aria-hidden="true" />
              <div>
                <strong>Review explanations</strong>
                <p className="muted">Use feedback to improve future attempts.</p>
              </div>
            </li>
          </ul>

          <div className="dashboard-panel__footer">
            <button className="btn btn--primary btn--small" type="button" onClick={submitQuiz} disabled={reviewMode}>
              {reviewMode ? 'Submitted' : secondsLeft === 0 ? 'Submit (time up)' : 'Submit quiz'}
            </button>
            <button className="btn btn--ghost btn--small" type="button" onClick={resetAttempt}>
              Reset attempt
            </button>
          </div>

          {secondsLeft === 0 && !reviewMode && (
            <p className="muted">Time is up. Submit now to lock and evaluate your answers.</p>
          )}

          {result && (
            <div className="quiz-result card">
              <h3>Result Summary</h3>
              <p className="quiz-result__score">
                Score: <strong>{result.correct}</strong> / {result.total} ({result.percentage}%)
              </p>
              <p className="muted">
                Correct: {result.correct} | Incorrect: {result.incorrect} | Unanswered: {result.unanswered}
              </p>
              <p className="muted">
                Status:{' '}
                <span className={`pill ${result.passed ? 'pill--success' : 'pill--hard'}`}>
                  {result.passed ? 'Passed' : 'Needs improvement'}
                </span>
              </p>
            </div>
          )}
        </aside>
      </section>

      {result && (
        <section className="card quiz-review-note">
          <h3>Review Mode Enabled</h3>
          <p className="muted">
            Correct answers and explanations are visible now. Reset attempt to retake this quiz.
          </p>
        </section>
      )}
    </div>
  );
};

const evaluateResult = (quiz, answers) => {
  const total = quiz.questions.length;
  let correct = 0;
  let unanswered = 0;

  quiz.questions.forEach((question, index) => {
    const selected = answers[index];
    if (selected === null) {
      unanswered += 1;
      return;
    }
    if (selected === question.correctIndex) {
      correct += 1;
    }
  });

  const incorrect = total - correct - unanswered;
  const percentage = Math.round((correct / Math.max(total, 1)) * 100);

  return {
    total,
    correct,
    incorrect,
    unanswered,
    percentage,
    passed: percentage >= quiz.passPercent
  };
};

export default QuizPage;
