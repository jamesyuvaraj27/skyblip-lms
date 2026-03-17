export const studentCourses = [
  {
    id: '1',
    title: 'JavaScript Foundations to Advanced Patterns',
    shortTitle: 'JavaScript Foundations',
    level: 'Beginner',
    track: 'Frontend',
    instructor: 'Rhea Kulkarni',
    rating: 4.7,
    learners: 18210,
    durationHours: 18,
    totalLessons: 26,
    completedLessons: 19,
    projects: 3,
    certificateEligible: true,
    lastActivity: 'Today, 09:35',
    nextLessonId: 'js-20',
    nextLessonTitle: 'Closures and Module Patterns',
    description:
      'Build strong JavaScript fundamentals with real tasks, mini projects, and interview-focused exercises.',
    outcomes: ['DOM mastery', 'Async JavaScript', 'State management basics', 'Testing foundations'],
    modules: [
      {
        id: 'js-m1',
        title: 'Core Syntax and Logic',
        progressPercent: 100,
        lessons: [
          {
            id: 'js-11',
            title: 'Variables, data types, and operators',
            minutes: 14,
            type: 'Video',
            completed: true,
            xp: 45,
            summary:
              'Understand primitive and reference types, declaration keywords, and practical operator usage.',
            resources: ['Cheat Sheet: JS types', 'Hands-on: Type conversion drills']
          },
          {
            id: 'js-12',
            title: 'Conditionals and loops',
            minutes: 18,
            type: 'Video + Lab',
            completed: true,
            xp: 55,
            summary: 'Apply branching and iteration to solve repetitive coding tasks quickly.',
            resources: ['Loop patterns workbook', 'Debug exercise set']
          }
        ]
      },
      {
        id: 'js-m2',
        title: 'Functions and Scope',
        progressPercent: 76,
        lessons: [
          {
            id: 'js-20',
            title: 'Closures and Module Patterns',
            minutes: 22,
            type: 'Video',
            completed: false,
            xp: 70,
            summary: 'Use closures to create private state and reusable module APIs.',
            resources: ['Closure visualizer', 'Pattern workbook']
          },
          {
            id: 'js-21',
            title: 'Higher-order functions in production',
            minutes: 19,
            type: 'Lab',
            completed: false,
            xp: 65,
            summary: 'Map, filter, reduce, and function composition for clean data transformations.',
            resources: ['Functional snippets pack', 'Code review checklist']
          }
        ]
      },
      {
        id: 'js-m3',
        title: 'Async JavaScript and APIs',
        progressPercent: 32,
        lessons: [
          {
            id: 'js-31',
            title: 'Promises, async/await, and error handling',
            minutes: 24,
            type: 'Video + Quiz',
            completed: false,
            xp: 80,
            summary: 'Design predictable async flows with proper retries and fallback handling.',
            resources: ['Async patterns map', 'API failure simulation lab']
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Data Structures and Algorithms Interview Prep',
    shortTitle: 'DSA Interview Prep',
    level: 'Intermediate',
    track: 'Problem Solving',
    instructor: 'Aniket Sharma',
    rating: 4.8,
    learners: 24390,
    durationHours: 28,
    totalLessons: 34,
    completedLessons: 15,
    projects: 5,
    certificateEligible: true,
    lastActivity: 'Yesterday, 21:10',
    nextLessonId: 'dsa-17',
    nextLessonTitle: 'Monotonic Stack Patterns',
    description:
      'Master high-value interview patterns with visual dry-runs, guided code templates, and timed practice.',
    outcomes: ['Pattern recognition', 'Complexity analysis', 'Mock interview readiness', 'Contest confidence'],
    modules: [
      {
        id: 'dsa-m1',
        title: 'Arrays and Hashing',
        progressPercent: 84,
        lessons: [
          {
            id: 'dsa-11',
            title: 'Sliding window essentials',
            minutes: 20,
            type: 'Video',
            completed: true,
            xp: 60,
            summary: 'Identify fixed and dynamic window variants and apply template-driven coding.',
            resources: ['Window templates', 'Practice set A']
          },
          {
            id: 'dsa-12',
            title: 'Prefix sums and difference arrays',
            minutes: 18,
            type: 'Video + Lab',
            completed: true,
            xp: 55,
            summary: 'Convert brute-force range queries into linear-time solutions.',
            resources: ['Prefix sum cheat sheet', 'Range query drills']
          }
        ]
      },
      {
        id: 'dsa-m2',
        title: 'Stacks and Queues',
        progressPercent: 42,
        lessons: [
          {
            id: 'dsa-17',
            title: 'Monotonic Stack Patterns',
            minutes: 23,
            type: 'Video',
            completed: false,
            xp: 75,
            summary: 'Solve next-greater and histogram style problems with stack invariants.',
            resources: ['Pattern decision tree', 'Practice set B']
          },
          {
            id: 'dsa-18',
            title: 'Queue simulations and deque tricks',
            minutes: 21,
            type: 'Lab',
            completed: false,
            xp: 70,
            summary: 'Use queues for scheduling, stream processing, and window-based optimization.',
            resources: ['Deque notes', 'Simulation challenge pack']
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'React and Product Engineering Capstone',
    shortTitle: 'React Capstone',
    level: 'Advanced',
    track: 'Frontend',
    instructor: 'Milan Dutta',
    rating: 4.6,
    learners: 10980,
    durationHours: 16,
    totalLessons: 20,
    completedLessons: 6,
    projects: 2,
    certificateEligible: true,
    lastActivity: '3 days ago',
    nextLessonId: 'react-07',
    nextLessonTitle: 'Performance profiling and memoization',
    description:
      'Ship production-style React features with architecture, performance tuning, and deployment workflows.',
    outcomes: ['Component architecture', 'State flow strategy', 'Performance profiling', 'Release checklist'],
    modules: [
      {
        id: 'react-m1',
        title: 'Scalable Component Architecture',
        progressPercent: 60,
        lessons: [
          {
            id: 'react-05',
            title: 'Compound components and slots',
            minutes: 19,
            type: 'Video',
            completed: true,
            xp: 58,
            summary: 'Create flexible APIs that remain easy to test and maintain.',
            resources: ['Architecture reference repo', 'Refactor exercise']
          },
          {
            id: 'react-07',
            title: 'Performance profiling and memoization',
            minutes: 24,
            type: 'Video + Lab',
            completed: false,
            xp: 82,
            summary: 'Profile render bottlenecks and optimize with the correct memoization strategy.',
            resources: ['Profiler walkthrough', 'Optimization checklist']
          }
        ]
      }
    ]
  }
];

export const studentProblems = [
  {
    id: '1',
    title: 'Two Sum',
    category: 'Arrays',
    difficulty: 'Easy',
    acceptance: 71,
    submissions: '1.2M',
    points: 50,
    solved: true,
    attempted: true,
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    constraints: '2 <= nums.length <= 1e4\n-1e9 <= nums[i] <= 1e9\n-1e9 <= target <= 1e9',
    tags: ['HashMap', 'Array'],
    hints: ['Store seen values in a map.', 'Check target - current before inserting current value.'],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ],
    testCases: [
      { name: 'Case 1', input: '[2,7,11,15], 9', expected: '[0,1]' },
      { name: 'Case 2', input: '[3,2,4], 6', expected: '[1,2]' },
      { name: 'Case 3', input: '[3,3], 6', expected: '[0,1]' }
    ],
    starterCode:
      'function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i += 1) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}'
  },
  {
    id: '2',
    title: 'Reverse String',
    category: 'Strings',
    difficulty: 'Easy',
    acceptance: 83,
    submissions: '870K',
    points: 30,
    solved: true,
    attempted: true,
    description: 'Reverse the input string in-place and return the transformed string.',
    constraints: '1 <= s.length <= 1e5',
    tags: ['Two Pointers', 'String'],
    hints: ['Use two pointers from ends.', 'Swap until pointers cross.'],
    examples: [
      { input: '"hello"', output: '"olleh"' },
      { input: '"a"', output: '"a"' }
    ],
    testCases: [
      { name: 'Case 1', input: '"hello"', expected: '"olleh"' },
      { name: 'Case 2', input: '"racecar"', expected: '"racecar"' }
    ],
    starterCode:
      'function reverseString(s) {\n  const chars = s.split(\'\');\n  let left = 0;\n  let right = chars.length - 1;\n  while (left < right) {\n    const temp = chars[left];\n    chars[left] = chars[right];\n    chars[right] = temp;\n    left += 1;\n    right -= 1;\n  }\n  return chars.join(\'\');\n}'
  },
  {
    id: '3',
    title: 'Merge Intervals',
    category: 'Arrays',
    difficulty: 'Medium',
    acceptance: 58,
    submissions: '620K',
    points: 120,
    solved: false,
    attempted: true,
    description: 'Merge all overlapping intervals and return a compact interval list.',
    constraints: '1 <= intervals.length <= 1e4',
    tags: ['Sorting', 'Intervals'],
    hints: ['Sort by start time.', 'Merge while next.start <= current.end.'],
    examples: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }
    ],
    testCases: [
      { name: 'Case 1', input: '[[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' },
      { name: 'Case 2', input: '[[1,4],[4,5]]', expected: '[[1,5]]' }
    ],
    starterCode:
      'function mergeIntervals(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const merged = [];\n  for (const interval of intervals) {\n    if (!merged.length || merged[merged.length - 1][1] < interval[0]) {\n      merged.push(interval);\n    } else {\n      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);\n    }\n  }\n  return merged;\n}'
  },
  {
    id: '4',
    title: 'Longest Palindromic Substring',
    category: 'Strings',
    difficulty: 'Medium',
    acceptance: 49,
    submissions: '780K',
    points: 140,
    solved: false,
    attempted: false,
    description: 'Find the longest palindromic substring in a given string.',
    constraints: '1 <= s.length <= 1000',
    tags: ['Dynamic Programming', 'Center Expansion'],
    hints: ['Expand around each center.', 'Track max span while scanning.'],
    examples: [{ input: '"babad"', output: '"bab"' }],
    testCases: [
      { name: 'Case 1', input: '"babad"', expected: '"bab" or "aba"' },
      { name: 'Case 2', input: '"cbbd"', expected: '"bb"' }
    ],
    starterCode:
      'function longestPalindrome(s) {\n  let best = "";\n  const expand = (left, right) => {\n    while (left >= 0 && right < s.length && s[left] === s[right]) {\n      left -= 1;\n      right += 1;\n    }\n    return s.slice(left + 1, right);\n  };\n  for (let i = 0; i < s.length; i += 1) {\n    const odd = expand(i, i);\n    const even = expand(i, i + 1);\n    const next = odd.length > even.length ? odd : even;\n    if (next.length > best.length) best = next;\n  }\n  return best;\n}'
  },
  {
    id: '5',
    title: 'Climbing Stairs',
    category: 'DP',
    difficulty: 'Easy',
    acceptance: 79,
    submissions: '950K',
    points: 60,
    solved: true,
    attempted: true,
    description: 'Count distinct ways to climb n steps if you can take 1 or 2 steps.',
    constraints: '1 <= n <= 45',
    tags: ['DP', 'Recurrence'],
    hints: ['Use Fibonacci relation.', 'Track only previous two states.'],
    examples: [{ input: 'n = 3', output: '3' }],
    testCases: [
      { name: 'Case 1', input: 'n = 2', expected: '2' },
      { name: 'Case 2', input: 'n = 5', expected: '8' }
    ],
    starterCode:
      'function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1;\n  let b = 2;\n  for (let i = 3; i <= n; i += 1) {\n    const next = a + b;\n    a = b;\n    b = next;\n  }\n  return b;\n}'
  },
  {
    id: '6',
    title: 'Coin Change',
    category: 'DP',
    difficulty: 'Medium',
    acceptance: 44,
    submissions: '680K',
    points: 160,
    solved: false,
    attempted: true,
    description: 'Return the fewest coins needed to make amount. Return -1 if not possible.',
    constraints: '1 <= coins.length <= 12\n0 <= amount <= 1e4',
    tags: ['DP', 'Unbounded Knapsack'],
    hints: ['Build dp[amount] bottom-up.', 'Initialize unreachable states to Infinity.'],
    examples: [{ input: 'coins = [1,2,5], amount = 11', output: '3' }],
    testCases: [
      { name: 'Case 1', input: '[1,2,5], 11', expected: '3' },
      { name: 'Case 2', input: '[2], 3', expected: '-1' }
    ],
    starterCode:
      'function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i += 1) {\n    for (const coin of coins) {\n      if (i - coin >= 0) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}'
  },
  {
    id: '7',
    title: 'Word Break',
    category: 'DP',
    difficulty: 'Hard',
    acceptance: 31,
    submissions: '410K',
    points: 220,
    solved: false,
    attempted: false,
    description: 'Determine if a string can be segmented into a sequence of dictionary words.',
    constraints: '1 <= s.length <= 300',
    tags: ['DP', 'Trie'],
    hints: ['Use dp[i] meaning prefix [0..i) is possible.', 'Try all valid word cuts.'],
    examples: [{ input: 's = "leetcode", dict = ["leet","code"]', output: 'true' }],
    testCases: [
      { name: 'Case 1', input: '"leetcode", ["leet","code"]', expected: 'true' },
      { name: 'Case 2', input: '"catsandog", ["cats","dog","sand","and","cat"]', expected: 'false' }
    ],
    starterCode:
      'function wordBreak(s, wordDict) {\n  const words = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i += 1) {\n    for (let j = 0; j < i; j += 1) {\n      if (dp[j] && words.has(s.slice(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}'
  }
];

export const studentQuizzes = [
  {
    id: 'q1',
    title: 'Arrays and Hashing Checkpoint',
    courseId: '2',
    durationMinutes: 12,
    passPercent: 70,
    attemptsAllowed: 3,
    questions: [
      {
        id: 'q1-1',
        question: 'Average time complexity of HashMap lookup is:',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
        correctIndex: 2,
        explanation: 'Hashing gives near-constant average lookup with good distribution.'
      },
      {
        id: 'q1-2',
        question: 'Which technique is best for checking duplicates in an array quickly?',
        options: ['Nested loops', 'Sorting every time', 'Hash set', 'Recursion'],
        correctIndex: 2,
        explanation: 'A hash set supports O(1) average existence checks while scanning.'
      },
      {
        id: 'q1-3',
        question: 'Sliding window is most useful when:',
        options: [
          'You need all permutations',
          'You process contiguous ranges',
          'You search tree depth',
          'You build linked lists'
        ],
        correctIndex: 1,
        explanation: 'The technique optimizes contiguous segment computations.'
      },
      {
        id: 'q1-4',
        question: 'Prefix sums help optimize:',
        options: ['Single element updates', 'Range sum queries', 'Graph traversal only', 'Heap balancing'],
        correctIndex: 1,
        explanation: 'Prefix sums reduce range sum query time from O(n) to O(1).'
      }
    ]
  },
  {
    id: 'q2',
    title: 'JavaScript Runtime and Async Patterns',
    courseId: '1',
    durationMinutes: 15,
    passPercent: 75,
    attemptsAllowed: 2,
    questions: [
      {
        id: 'q2-1',
        question: 'What queue runs Promise callbacks in JavaScript?',
        options: ['Call stack', 'Task queue', 'Microtask queue', 'Render queue'],
        correctIndex: 2,
        explanation: 'Promise reactions run in the microtask queue before the next task.'
      },
      {
        id: 'q2-2',
        question: 'Which pattern prevents callback pyramids best?',
        options: ['setTimeout chains', 'async/await with try/catch', 'Global variables', 'Synchronous blocking'],
        correctIndex: 1,
        explanation: 'async/await keeps control flow flat and readable with scoped error handling.'
      },
      {
        id: 'q2-3',
        question: 'Closures are primarily used for:',
        options: ['Memory leaks', 'Private state', 'Global state only', 'DOM parsing'],
        correctIndex: 1,
        explanation: 'Closures retain access to outer variables and enable encapsulation.'
      }
    ]
  }
];

export const weeklyLearningMinutes = [
  { day: 'Mon', minutes: 28 },
  { day: 'Tue', minutes: 44 },
  { day: 'Wed', minutes: 36 },
  { day: 'Thu', minutes: 52 },
  { day: 'Fri', minutes: 40 },
  { day: 'Sat', minutes: 22 },
  { day: 'Sun', minutes: 33 }
];

export const studentDeadlines = [
  {
    id: 'dl-1',
    title: 'Quiz: Arrays and Hashing Checkpoint',
    due: 'Today, 7:30 PM',
    meta: '12 mins | 4 questions',
    tone: 'warning'
  },
  {
    id: 'dl-2',
    title: 'Assignment: Monotonic Stack Drill',
    due: 'Tomorrow, 6:00 PM',
    meta: '3 coding tasks',
    tone: 'primary'
  },
  {
    id: 'dl-3',
    title: 'Live Session: React Performance Clinic',
    due: 'Thu, 5:00 PM',
    meta: 'Mentor Q&A',
    tone: 'info'
  }
];

export const studentAnnouncements = [
  {
    id: 'ann-1',
    title: 'New module unlocked in DSA track',
    body: 'Stacks and queues module is now live with guided dry-runs and challenge set B.',
    tone: 'success'
  },
  {
    id: 'ann-2',
    title: 'Compiler diagnostics updated',
    body: 'Problem workspace now shows syntax diagnostics and test case verdict cards.',
    tone: 'info'
  },
  {
    id: 'ann-3',
    title: 'Weekly leaderboard refresh',
    body: 'Solve at least 4 medium problems this week to enter top learner highlights.',
    tone: 'primary'
  }
];

export const studentActivityFeed = [
  { id: 'act-1', title: 'Accepted: Two Sum', meta: 'Practice | Easy | 1 hr ago', tone: 'success' },
  { id: 'act-2', title: 'Watched: Prefix Sums in 15 Minutes', meta: 'Course | 3 hrs ago', tone: 'info' },
  { id: 'act-3', title: 'Attempted: Coin Change', meta: 'Practice | Medium | Yesterday', tone: 'warning' }
];

export const studentAchievements = [
  {
    id: 'ach-1',
    title: 'Consistency Champion',
    body: 'Maintained a 7-day active learning streak in the last month.',
    tone: 'success'
  },
  {
    id: 'ach-2',
    title: 'Speed Solver',
    body: 'Solved 5 easy problems in under 30 minutes total.',
    tone: 'info'
  },
  {
    id: 'ach-3',
    title: 'Quiz Finisher',
    body: 'Completed 3 checkpoint quizzes with 70%+ score.',
    tone: 'warning'
  }
];

export const certificates = [
  {
    id: 'cert-1',
    title: 'JavaScript Foundations',
    status: 'In Progress',
    progressPercent: 73,
    requirement: 'Complete all modules + capstone quiz'
  },
  {
    id: 'cert-2',
    title: 'DSA Interview Prep',
    status: 'Locked',
    progressPercent: 44,
    requirement: 'Finish modules 1-4 and solve 30 practice problems'
  }
];

export const recommendedTracks = [
  {
    id: 'rec-1',
    title: 'System Design Essentials',
    level: 'Intermediate',
    reason: 'Matches your progress in DSA and interview readiness goals.',
    duration: '10 hrs'
  },
  {
    id: 'rec-2',
    title: 'Frontend Performance Bootcamp',
    level: 'Advanced',
    reason: 'Pairs with your React capstone track and recent lessons.',
    duration: '8 hrs'
  }
];

export const studentSnapshot = {
  streakDays: 6,
  activeCourses: 3,
  solvedProblems: 24,
  solvedThisWeek: 7,
  quizzesCompleted: 5,
  averageQuizScore: 82,
  continueCourseId: '2'
};

export const getCourseById = (courseId) =>
  studentCourses.find((course) => String(course.id) === String(courseId));

export const getProblemById = (problemId) =>
  studentProblems.find((problem) => String(problem.id) === String(problemId));

export const getQuizById = (quizId) => studentQuizzes.find((quiz) => String(quiz.id) === String(quizId));

export const getAllLessonsForCourse = (course) =>
  (course?.modules ?? []).flatMap((module) => module.lessons ?? []);

export const getContinueCourse = () => getCourseById(studentSnapshot.continueCourseId) ?? studentCourses[0];
