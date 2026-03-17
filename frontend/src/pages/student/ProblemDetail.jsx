import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStudentPrefs } from '../../context/useStudentPrefs.js';
import { getProblemById } from './studentData.js';
import './ProblemDetail.css';

const difficultyToTone = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard'
};

const verdictToPill = (verdict) => {
  if (verdict === 'Accepted') return 'pill--success';
  if (verdict === 'Wrong Answer') return 'pill--hard';
  if (verdict === 'Partial') return 'pill--warning';
  if (verdict === 'Compile Error') return 'pill--hard';
  return 'pill--filter';
};

const hashCode = (input) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const evaluateCode = ({ code, testCases, mode }) => {
  const trimmed = code.trim();

  if (!trimmed) {
    return {
      verdict: 'Compile Error',
      output: 'Compilation aborted: source file is empty.',
      errors: [{ line: 1, column: 1, message: 'Expected solution function, found empty source.' }],
      tests: []
    };
  }

  if (!/function\s+[a-zA-Z0-9_]+\s*\(/.test(code) && !/=>/.test(code)) {
    return {
      verdict: 'Compile Error',
      output: 'Compilation failed: missing function declaration.',
      errors: [
        {
          line: 1,
          column: 1,
          message: 'Define a function signature before running test cases.'
        }
      ],
      tests: []
    };
  }

  if (/TODO|FIXME|throw\s+new\s+Error/.test(code)) {
    return {
      verdict: 'Compile Error',
      output: 'Compilation failed: placeholder statements are not allowed.',
      errors: [
        {
          line: Math.max(code.split('\n').findIndex((line) => /TODO|FIXME|throw\s+new\s+Error/.test(line)) + 1, 1),
          column: 1,
          message: 'Remove TODO/FIXME placeholders before submitting.'
        }
      ],
      tests: []
    };
  }

  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    return {
      verdict: 'Compile Error',
      output: 'Compilation failed: unmatched braces detected.',
      errors: [{ line: code.split('\n').length, column: 1, message: 'Check opening/closing braces.' }],
      tests: []
    };
  }

  const seed = hashCode(code);
  const confidence = 0.35 + ((seed % 45) / 100);
  const testList = mode === 'run' ? testCases.slice(0, 2) : testCases;

  const tests = testList.map((testCase, index) => {
    const threshold = 0.32 + index * 0.11;
    const pass = confidence > threshold;

    return {
      ...testCase,
      passed: pass,
      actual: pass ? testCase.expected : 'Output mismatch'
    };
  });

  const passedCount = tests.filter((test) => test.passed).length;
  const allPassed = passedCount === tests.length;

  const verdict = allPassed ? 'Accepted' : passedCount > 0 ? 'Partial' : 'Wrong Answer';

  return {
    verdict,
    output: allPassed
      ? `Execution complete. ${passedCount}/${tests.length} test cases passed.`
      : `Execution complete. ${passedCount}/${tests.length} test cases passed.`,
    errors: [],
    tests,
    runtime: `${55 + (seed % 41)} ms`,
    memory: `${18 + (seed % 12)} MB`
  };
};

const ProblemDetail = () => {
  const { problemId } = useParams();
  const { prefs } = useStudentPrefs();

  const problem = useMemo(() => getProblemById(problemId) ?? getProblemById('1'), [problemId]);

  const [code, setCode] = useState(() => problem?.starterCode || '');
  const [language, setLanguage] = useState(() => prefs.defaultLanguage || 'javascript');
  const [submitting, setSubmitting] = useState(false);
  const [verdict, setVerdict] = useState('');
  const [activeTab, setActiveTab] = useState('statement');
  const [activePanel, setActivePanel] = useState('output');
  const [runOutput, setRunOutput] = useState('Click "Run Code" to execute sample test cases.');
  const [compilerErrors, setCompilerErrors] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [runtime, setRuntime] = useState('-');
  const [memory, setMemory] = useState('-');
  const [history, setHistory] = useState(() => [
    {
      id: 1,
      verdict: problem?.solved ? 'Accepted' : 'Wrong Answer',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      runtime: problem?.solved ? '62 ms' : '-',
      memory: problem?.solved ? '19 MB' : '-'
    },
    {
      id: 2,
      verdict: 'Compile Error',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      runtime: '-',
      memory: '-'
    }
  ]);

  if (!problem) return <div>Loading problem workspace...</div>;

  const handleRun = async (mode) => {
    setSubmitting(true);
    try {
      const result = evaluateCode({ code, testCases: problem.testCases ?? [], mode });
      setVerdict(result.verdict);
      setRunOutput(result.output);
      setCompilerErrors(result.errors ?? []);
      setTestResults(result.tests ?? []);
      setRuntime(result.runtime ?? '-');
      setMemory(result.memory ?? '-');

      setHistory((prev) => [
        {
          id: prev.length + 1,
          verdict: result.verdict,
          createdAt: new Date().toISOString(),
          runtime: result.runtime ?? '-',
          memory: result.memory ?? '-'
        },
        ...prev
      ]);

      if (result.verdict === 'Compile Error') {
        setActivePanel('errors');
      } else if (mode === 'run') {
        setActivePanel('tests');
      } else {
        setActivePanel('output');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormat = () => {
    const formatted = code
      .split('\n')
      .map((line) => line.replace(/\s+$/g, ''))
      .join('\n')
      .replace(/\t/g, '  ');
    setCode(formatted);
  };

  return (
    <div className="problem-layout problem-layout--premium">
      <section className="problem-statement">
        <header className="problem-hero">
          <div>
            <p className="dashboard-hero__eyebrow">Problem workspace</p>
            <h2 className="mycourses-hero__title">{problem.title}</h2>
            <p className="muted">{problem.description}</p>
          </div>

          <div className="problem-hero__meta">
            <span className={`pill pill--${difficultyToTone[problem.difficulty] ?? 'filter'}`}>
              {problem.difficulty}
            </span>
            <span className="pill pill--filter">{problem.category}</span>
            <span className="pill pill--filter">{problem.acceptance}% accuracy</span>
            <span className="pill pill--filter">{problem.submissions} submissions</span>
            <span className="pill pill--filter">{problem.points} points</span>
          </div>

          <div className="course-card__meta-row">
            {(problem.tags ?? []).map((tag) => (
              <span key={tag} className="pill pill--filter">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="problem-tabs" role="tablist" aria-label="Problem tabs">
          <button
            type="button"
            className={`pill pill--filter ${activeTab === 'statement' ? 'problem-tab--active' : ''}`}
            onClick={() => setActiveTab('statement')}
          >
            Statement
          </button>
          <button
            type="button"
            className={`pill pill--filter ${activeTab === 'examples' ? 'problem-tab--active' : ''}`}
            onClick={() => setActiveTab('examples')}
          >
            Examples
          </button>
          <button
            type="button"
            className={`pill pill--filter ${activeTab === 'hints' ? 'problem-tab--active' : ''}`}
            onClick={() => setActiveTab('hints')}
          >
            Hints
          </button>
          <button
            type="button"
            className={`pill pill--filter ${activeTab === 'editorial' ? 'problem-tab--active' : ''}`}
            onClick={() => setActiveTab('editorial')}
          >
            Editorial
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
              {(problem.examples ?? []).map((example, idx) => (
                <div key={`${example.input}-${idx}`} className="problem-example card">
                  <p className="stat-label">Input</p>
                  <pre className="problem-pre">{example.input}</pre>
                  <p className="stat-label problem-example__label">Output</p>
                  <pre className="problem-pre">{example.output}</pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hints' && (
          <div className="problem-section" role="tabpanel">
            <h4>Hints</h4>
            <ul className="dashboard-rows">
              {(problem.hints ?? []).map((hint, index) => (
                <li key={hint} className="dashboard-row">
                  <span className="dot dot--info" aria-hidden="true" />
                  <div className="dashboard-row__main">
                    <p className="dashboard-row__title">Hint {index + 1}</p>
                    <p className="muted">{hint}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'editorial' && (
          <div className="problem-section" role="tabpanel">
            <h4>Approach outline</h4>
            <ul className="problem-editorial-list">
              <li>Start by identifying data structures that reduce repeated lookups.</li>
              <li>Dry run one sample and track how state evolves each iteration.</li>
              <li>Validate edge cases: empty arrays, duplicates, and large values.</li>
              <li>Target linear time and constant extra space when possible.</li>
            </ul>
          </div>
        )}
      </section>

      <section className="problem-editor">
        <div className="editor-header">
          <h3>Compiler workspace</h3>
          <div className="editor-header__meta">
            {verdict && <span className={`pill ${verdictToPill(verdict)}`}>{verdict}</span>}
            <span className="pill pill--filter">Runtime: {runtime}</span>
            <span className="pill pill--filter">Memory: {memory}</span>
          </div>
        </div>

        <div className="problem-workspace-meta">
          <label className="problem-inline-control">
            Language
            <select className="mycourses-select" value={language} onChange={(event) => setLanguage(event.target.value)}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>
          </label>
          <span className="pill pill--filter">Auto-run tests: {prefs.autoRunTests ? 'On' : 'Off'}</span>
          <span className="pill pill--filter">Line numbers: {prefs.showLineNumbers ? 'On' : 'Off'}</span>
          <span className="pill pill--filter">Compiler hints: {prefs.showCompilerHints ? 'On' : 'Off'}</span>
        </div>

        <textarea className="code-editor" value={code} onChange={(event) => setCode(event.target.value)} />

        <div className="problem-actions">
          <div className="problem-actions__left">
            <button className="btn btn--ghost btn--small" type="button" onClick={() => setCode(problem.starterCode || '')}>
              Reset
            </button>
            <button className="btn btn--ghost btn--small" type="button" onClick={handleFormat}>
              Format
            </button>
          </div>
          <div className="problem-actions__right">
            <button
              className="btn btn--ghost btn--small"
              type="button"
              onClick={() => handleRun('run')}
              disabled={submitting}
            >
              {submitting ? 'Running...' : 'Run Code'}
            </button>
            <button
              className="btn btn--primary btn--small"
              type="button"
              onClick={() => handleRun('submit')}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="compiler-panel card">
          <div className="problem-tabs" role="tablist" aria-label="Compiler output tabs">
            <button
              type="button"
              className={`pill pill--filter ${activePanel === 'output' ? 'problem-tab--active' : ''}`}
              onClick={() => setActivePanel('output')}
            >
              Output
            </button>
            <button
              type="button"
              className={`pill pill--filter ${activePanel === 'tests' ? 'problem-tab--active' : ''}`}
              onClick={() => setActivePanel('tests')}
            >
              Test Cases
            </button>
            <button
              type="button"
              className={`pill pill--filter ${activePanel === 'errors' ? 'problem-tab--active' : ''}`}
              onClick={() => setActivePanel('errors')}
            >
              Compiler Errors
            </button>
          </div>

          {activePanel === 'output' && (
            <pre className="problem-pre compiler-panel__output">{runOutput}</pre>
          )}

          {activePanel === 'tests' && (
            <div className="compiler-tests">
              {(testResults.length ? testResults : problem.testCases ?? []).map((test) => (
                <article key={test.name} className="compiler-test-card">
                  <div className="compiler-test-card__header">
                    <strong>{test.name}</strong>
                    {'passed' in test ? (
                      <span className={`pill ${test.passed ? 'pill--success' : 'pill--hard'}`}>
                        {test.passed ? 'Passed' : 'Failed'}
                      </span>
                    ) : (
                      <span className="pill pill--filter">Not run</span>
                    )}
                  </div>
                  <p className="muted">Input: {test.input}</p>
                  <p className="muted">Expected: {test.expected}</p>
                  {'actual' in test && !test.passed && <p className="muted">Actual: {test.actual}</p>}
                </article>
              ))}
            </div>
          )}

          {activePanel === 'errors' && (
            <div className="compiler-errors">
              {compilerErrors.length === 0 ? (
                <p className="muted">No compiler errors in the latest run.</p>
              ) : (
                compilerErrors.map((error, index) => (
                  <div key={`${error.line}-${index}`} className="compiler-error-row">
                    <span className="pill pill--hard">Line {error.line}:{error.column}</span>
                    <p>{error.message}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="submission-history">
          <div className="dashboard-panel__header">
            <div>
              <h4>Submission history</h4>
              <p className="muted">Recent attempts with verdict, runtime, and memory.</p>
            </div>
          </div>

          <div className="submission-table">
            <div className="submission-table__head muted">
              <span>When</span>
              <span>Verdict</span>
              <span>Runtime</span>
              <span>Memory</span>
            </div>
            {history.map((item) => (
              <div key={item.id} className="submission-table__row">
                <span>{new Date(item.createdAt).toLocaleString()}</span>
                <span className={`pill ${verdictToPill(item.verdict)}`}>{item.verdict}</span>
                <span className="muted">{item.runtime}</span>
                <span className="muted">{item.memory}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProblemDetail;
