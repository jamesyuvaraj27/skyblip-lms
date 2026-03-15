import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_skyblip_secret_change_me';
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skyblip_lms_student_dashboard';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- Connect to MongoDB ---
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', err.message);
  });

// --- In-memory data to simulate non-auth collections (still demo only) ---
const roles = ['student', 'instructor', 'admin'];

const courses = [
  {
    id: 'c1',
    title: 'Intro to Data Structures',
    description: 'Learn arrays, stacks, queues and linked lists with hands-on problems.',
    category: 'Data Structures',
    instructorName: 'Jane Doe',
    thumbnail:
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'published'
  }
];

const modules = [
  {
    id: 'm1',
    courseId: 'c1',
    title: 'Arrays & Complexity',
    order: 1
  },
  {
    id: 'm2',
    courseId: 'c1',
    title: 'Stacks & Queues',
    order: 2
  }
];

const lessons = [
  {
    id: 'l1',
    moduleId: 'm1',
    title: 'Why Arrays Matter',
    order: 1,
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    content: 'Conceptual overview of arrays, indexing and complexity.'
  },
  {
    id: 'l2',
    moduleId: 'm1',
    title: 'Array Problems Walkthrough',
    order: 2,
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    content: 'Live coding through simple array problems.'
  }
];

const problems = [
  {
    id: 'p1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target...',
    constraints: '2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]'
      }
    ],
    starterCode: 'function twoSum(nums, target) {\n  // write your code here\n}\n'
  }
];

const submissions = [];

const quizzes = [
  {
    id: 'q1',
    courseId: 'c1',
    title: 'Arrays Basics Quiz',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1-1',
        question: 'What is the time complexity of accessing an element by index in an array?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctIndex: 0
      }
    ]
  }
];

const quizResults = [];
const enrollments = [
  {
    id: 'e1',
    userId: 'u1',
    courseId: 'c1',
    progressPercent: 30
  }
];

const progressTracking = [];

// --- Helpers ---
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
};

const authMiddleware = (requiredRole = null) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing token' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      User.findById(payload.id)
        .then((user) => {
          if (!user) return res.status(401).json({ message: 'User not found' });
          if (requiredRole && user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden for this role' });
          }
          req.user = user;
          next();
        })
        .catch(() => res.status(401).json({ message: 'Invalid user' }));
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }
  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: 'student'
    });
    const token = generateToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to register user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to login' });
  }
});

app.get('/api/auth/me', authMiddleware(), (req, res) => {
  const { _id, name, email, role, avatarUrl, bio } = req.user;
  res.json({ id: _id, name, email, role, avatarUrl, bio });
});

// --- Public content (Landing/Explore) ---
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  const courseModules = modules.filter((m) => m.courseId === course.id);
  res.json({ ...course, modules: courseModules });
});

// --- Student dashboard APIs ---
app.get('/api/student/overview', authMiddleware('student'), (req, res) => {
  const userEnrollments = enrollments.filter((e) => e.userId === req.user.id);
  const progress = progressTracking.find((p) => p.userId === req.user.id);

  res.json({
    enrolledCourses: userEnrollments.length,
    avgProgress:
      userEnrollments.length === 0
        ? 0
        : Math.round(
            userEnrollments.reduce((sum, e) => sum + (e.progressPercent || 0), 0) /
              userEnrollments.length
          ),
    completedLessons: progress?.completedLessonIds?.length || 0,
    solvedProblems: progress?.solvedProblemIds?.length || 0
  });
});

app.get('/api/student/courses', authMiddleware('student'), (req, res) => {
  const userEnrollments = enrollments.filter((e) => e.userId === req.user.id);
  const result = userEnrollments.map((en) => {
    const course = courses.find((c) => c.id === en.courseId);
    return {
      id: en.id,
      courseId: en.courseId,
      courseTitle: course?.title,
      thumbnail: course?.thumbnail,
      progressPercent: en.progressPercent
    };
  });
  res.json(result);
});

app.get('/api/courses/:courseId/learning', authMiddleware('student'), (req, res) => {
  const { courseId } = req.params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  const courseModules = modules
    .filter((m) => m.courseId === courseId)
    .map((m) => ({
      ...m,
      lessons: lessons.filter((l) => l.moduleId === m.id)
    }));
  res.json({ ...course, modules: courseModules });
});

app.get('/api/lessons/:lessonId', authMiddleware('student'), (req, res) => {
  const lesson = lessons.find((l) => l.id === req.params.lessonId);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  res.json(lesson);
});

// --- Practice / Problems ---
app.get('/api/problems', authMiddleware('student'), (req, res) => {
  res.json(problems);
});

app.get('/api/problems/:id', authMiddleware('student'), (req, res) => {
  const problem = problems.find((p) => p.id === req.params.id);
  if (!problem) return res.status(404).json({ message: 'Problem not found' });
  res.json(problem);
});

app.post('/api/problems/:id/submit', authMiddleware('student'), (req, res) => {
  const problem = problems.find((p) => p.id === req.params.id);
  if (!problem) return res.status(404).json({ message: 'Problem not found' });
  const { code, language = 'javascript' } = req.body;
  const verdict = code && code.includes('return') ? 'Accepted' : 'Pending Review';
  const submission = {
    id: `s${submissions.length + 1}`,
    userId: req.user.id,
    problemId: problem.id,
    code,
    language,
    verdict,
    createdAt: new Date().toISOString()
  };
  submissions.push(submission);
  res.status(201).json(submission);
});

app.get('/api/problems/:id/submissions', authMiddleware('student'), (req, res) => {
  const items = submissions.filter(
    (s) => s.problemId === req.params.id && s.userId === req.user.id
  );
  res.json(items);
});

// --- Quiz system ---
app.get('/api/quizzes/:id', authMiddleware('student'), (req, res) => {
  const quiz = quizzes.find((q) => q.id === req.params.id);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  const safeQuiz = {
    ...quiz,
    questions: quiz.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options
    }))
  };
  res.json(safeQuiz);
});

app.post('/api/quizzes/:id/submit', authMiddleware('student'), (req, res) => {
  const quiz = quizzes.find((q) => q.id === req.params.id);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  const { answers } = req.body;
  if (!Array.isArray(answers)) {
    return res.status(400).json({ message: 'Answers array required' });
  }
  let score = 0;
  quiz.questions.forEach((q, index) => {
    if (answers[index] === q.correctIndex) score += 1;
  });
  const result = {
    id: `qr${quizResults.length + 1}`,
    quizId: quiz.id,
    userId: req.user.id,
    score,
    total: quiz.questions.length,
    createdAt: new Date().toISOString()
  };
  quizResults.push(result);
  res.status(201).json(result);
});

// --- Profile & settings ---
app.put('/api/student/profile', authMiddleware('student'), (req, res) => {
  const { name, bio } = req.body;
  if (name) req.user.name = name;
  if (bio !== undefined) req.user.bio = bio;
  req.user
    .save()
    .then((saved) => {
      res.json({
        id: saved._id,
        name: saved.name,
        email: saved.email,
        role: saved.role,
        avatarUrl: saved.avatarUrl,
        bio: saved.bio
      });
    })
    .catch(() => res.status(500).json({ message: 'Failed to update profile' }));
});

app.put('/api/student/settings/password', authMiddleware('student'), (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new password required' });
  }
  const isValid = bcrypt.compareSync(currentPassword, req.user.passwordHash);
  if (!isValid) return res.status(400).json({ message: 'Current password is incorrect' });
  req.user.passwordHash = bcrypt.hashSync(newPassword, 10);
  req.user
    .save()
    .then(() => res.json({ message: 'Password updated' }))
    .catch(() => res.status(500).json({ message: 'Failed to update password' }));
});

app.get('/', (req, res) => {
  res.send('Skyblip LMS backend is running (student dashboard only).');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Skyblip LMS backend listening on port ${PORT}`);
});

