import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';

const mockProblemsData = {
  1: {
    id: 1,
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.',
    difficulty: 'Easy',
    category: 'Arrays',
    constraints:
      '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
    hints: [
      'Try using a map to store values you have already seen.',
      'For each number, check if (target - number) is in the map.'
    ],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ],
    starterCode: 'function twoSum(nums, target) {\n  // Your solution here\n  return [];\n}'
  },
  2: {
    id: 2,
    title: 'Reverse String',
    description: 'Write a function that reverses a string.',
    difficulty: 'Easy',
    category: 'Strings',
    constraints: '1 <= s.length <= 10^5',
    hints: ['Use two pointers or built-in helpers, but try doing it manually first.'],
    examples: [
      { input: 's = "hello"', output: '"olleh"' },
      { input: 's = "a"', output: '"a"' }
    ],
    starterCode: 'function reverseString(s) {\n  // Your solution here\n  return "";\n}'
  },
  3: {
    id: 3,
    title: 'Merge Intervals',
    description: 'Given an array of intervals, merge all overlapping intervals.',
    difficulty: 'Medium',
    category: 'Arrays',
    constraints: '1 <= intervals.length <= 10^4',
    hints: ['Sort intervals by start time.', 'Merge when the next start is <= current end.'],
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]'
      }
    ],
    starterCode: 'function mergeIntervals(intervals) {\n  // Your solution here\n  return [];\n}'
  }
};

const verdictToPill = (v) => {
  if (v === 'Accepted') return 'pill--success';
  if (v === 'Wrong Answer') return 'pill--hard';
  if (v === 'Time Limit') return 'pill--warning';
  return 'pill--filter';
};

const ProblemDetailInner = ({ problem }) => {
  const [code, setCode] = useState(() => problem?.starterCode || '');
  const [submitting, setSubmitting] = useState(false);
  const [verdict, setVerdict] = useState('');
  const [activeTab, setActiveTab] = useState('statement');
  const [history, setHistory] = useState(() => [
    {
      id: 1,
      verdict: 'Accepted',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      runtime: '68 ms'
    },
    {
      id: 2,
      verdict: 'Wrong Answer',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      runtime: '—'
    }
  ]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setVerdict('');
    try {
      // Mock submission - no backend call
      const isCorrect = Math.random() > 0.5;
      const nextVerdict = isCorrect ? 'Accepted' : 'Wrong Answer';
      setVerdict(nextVerdict);
      
      // Add to history
      const newSubmission = {
        id: history.length + 1,
        verdict: nextVerdict,
        createdAt: new Date().toISOString(),
        runtime: isCorrect ? '72 ms' : '—'
      };
      setHistory((prev) => [newSubmission, ...prev]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="problem-layout problem-layout--premium">
      <section className="problem-statement">
        <header className="problem-hero">
          <div>
            <p className="dashboard-hero__eyebrow">Problem</p>
            <h2 className="mycourses-hero__title">{problem.title}</h2>
            <p className="muted">{problem.description}</p>
          </div>
          <div className="problem-hero__meta">
            <span className={`pill pill--${problem.difficulty?.toLowerCase()}`}>{problem.difficulty}</span>
            <span className="pill pill--filter">{problem.category}</span>
            <span className="pill pill--filter">Points · {problem.difficulty === 'Hard' ? 220 : problem.difficulty === 'Medium' ? 140 : 60}</span>
          </div>
        </header>

        <div className="problem-tabs" role="tablist" aria-label="Problem tabs">
          <button
            type="button"
            className={`pill pill--filter ${activeTab === 'statement' ? 'problem-tab--active' : ''}`}
            onClick={() => setActiveTab('statement')}
            role="tab"
            aria-selected={activeTab === 'statement'}
          >
            Statement
          </button>
          <button
            type="button"
            className={`pill pill--filter ${activeTab === 'examples' ? 'problem-tab--active' : ''}`}
            onClick={() => setActiveTab('examples')}
            role="tab"
            aria-selected={activeTab === 'examples'}
          >
            Examples
          </button>
          <button
            type="button"
            className={`pill pill--filter ${activeTab === 'hints' ? 'problem-tab--active' : ''}`}
            onClick={() => setActiveTab('hints')}
            role="tab"
            aria-selected={activeTab === 'hints'}
          >
            Hints
          </button>
        </div>

        {activeTab === 'statement' && (
          <div className="problem-section" role="tabpanel">
            <h4>Constraints</h4>
            <pre className="problem-pre">{problem.constraints}</pre>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="problem-section" role="tabpanel">
            <h4>Examples</h4>
            <div className="problem-examples">
              {problem.examples?.map((ex, idx) => (
                <div key={idx} className="problem-example card">
                  <p className="stat-label">Input</p>
                  <pre className="problem-pre">{ex.input}</pre>
                  <p className="stat-label" style={{ marginTop: '0.6rem' }}>
                    Output
                  </p>
                  <pre className="problem-pre">{ex.output}</pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hints' && (
          <div className="problem-section" role="tabpanel">
            <h4>Hints</h4>
            <ul className="dashboard-rows">
              {(problem.hints ?? []).map((h, i) => (
                <li key={i} className="dashboard-row">
                  <span className="dot dot--info" aria-hidden="true" />
                  <div className="dashboard-row__main">
                    <p className="dashboard-row__title">Hint {i + 1}</p>
                    <p className="muted">{h}</p>
                  </div>
                </li>
              ))}
              {(problem.hints ?? []).length === 0 && <p className="muted">No hints for this one yet.</p>}
            </ul>
          </div>
        )}
      </section>

      <section className="problem-editor">
        <div className="editor-header">
          <h3>Code workspace</h3>
          {verdict && <span className={`pill ${verdictToPill(verdict)}`}>{verdict}</span>}
        </div>

        <div className="problem-workspace-meta">
          <span className="pill pill--filter">Language · JavaScript</span>
          <span className="pill pill--filter">Auto-save · On</span>
          <span className="pill pill--filter">Test cases · Visible</span>
        </div>

        <textarea className="code-editor" value={code} onChange={(e) => setCode(e.target.value)} />

        <div className="problem-actions">
          <button className="btn btn--ghost btn--small" type="button" onClick={() => setCode(problem.starterCode || '')}>
            Reset code
          </button>
          <button className="btn btn--primary btn--small" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Running...' : 'Run & Submit'}
          </button>
        </div>

        <div className="submission-history">
          <div className="dashboard-panel__header">
            <div>
              <h4>Submission history</h4>
              <p className="muted">Your latest attempts (mocked for now).</p>
            </div>
          </div>
          <div className="submission-table">
            <div className="submission-table__head muted">
              <span>When</span>
              <span>Verdict</span>
              <span>Runtime</span>
            </div>
            {history.map((h) => (
              <div key={h.id} className="submission-table__row">
                <span>{new Date(h.createdAt).toLocaleString()}</span>
                <span className={`pill ${verdictToPill(h.verdict)}`}>{h.verdict}</span>
                <span className="muted">{h.runtime}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProblemDetail = () => {
  const { problemId } = useParams();
  useAuth();
  const problem = useMemo(() => mockProblemsData[problemId] || mockProblemsData[1], [problemId]);

  if (!problem) return <div>Loading problem...</div>;
  return <ProblemDetailInner key={problemId} problem={problem} />;
};

export default ProblemDetail;

