import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const ProblemDetail = () => {
  const { problemId } = useParams();
  const { token } = useAuth();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [verdict, setVerdict] = useState('');
  const [history, setHistory] = useState([]);

  // Mock problems data
  const mockProblemsData = {
    1: {
      id: 1,
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.',
      difficulty: 'Easy',
      category: 'Arrays',
      constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
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
      examples: [
        { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }
      ],
      starterCode: 'function mergeIntervals(intervals) {\n  // Your solution here\n  return [];\n}'
    }
  };

  useEffect(() => {
    // Mock fetch - no backend call
    const mockProblem = mockProblemsData[problemId] || mockProblemsData[1];
    setProblem(mockProblem);
    setCode(mockProblem.starterCode || '');
    
    // Mock submission history
    const mockHistory = [
      {
        id: 1,
        verdict: 'Accepted',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 2,
        verdict: 'Wrong Answer',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    setHistory(mockHistory);
  }, [problemId]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setVerdict('');
    try {
      // Mock submission - no backend call
      const isCorrect = Math.random() > 0.5;
      const verdict = isCorrect ? 'Accepted' : 'Wrong Answer';
      setVerdict(verdict);
      
      // Add to history
      const newSubmission = {
        id: history.length + 1,
        verdict,
        createdAt: new Date().toISOString()
      };
      setHistory((prev) => [newSubmission, ...prev]);
    } finally {
      setSubmitting(false);
    }
  };

  if (!problem) return <div>Loading problem...</div>;

  return (
    <div className="problem-layout">
      <section className="problem-statement">
        <h2>{problem.title}</h2>
        <p className="muted">{problem.description}</p>
        <div className="problem-meta">
          <span className={`pill pill--${problem.difficulty?.toLowerCase()}`}>
            {problem.difficulty}
          </span>
          <span className="pill pill--filter">{problem.category}</span>
        </div>
        <h4>Constraints</h4>
        <p className="muted">{problem.constraints}</p>
        <h4>Examples</h4>
        <ul>
          {problem.examples?.map((ex, idx) => (
            <li key={idx}>
              <strong>Input:</strong> {ex.input} <strong>Output:</strong> {ex.output}
            </li>
          ))}
        </ul>
      </section>
      <section className="problem-editor">
        <div className="editor-header">
          <h3>Code editor</h3>
          {verdict && <span className="pill pill--success">{verdict}</span>}
        </div>
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn btn--primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Run & Submit'}
        </button>
        <div className="submission-history">
          <h4>Submission history</h4>
          {history.map((h) => (
            <div key={h.id} className="submission-item">
              <span>{new Date(h.createdAt).toLocaleString()}</span>
              <span className="pill pill--success">{h.verdict}</span>
            </div>
          ))}
          {history.length === 0 && <p className="muted">No submissions yet.</p>}
        </div>
      </section>
    </div>
  );
};

export default ProblemDetail;

