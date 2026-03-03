import dotenv from 'dotenv';
dotenv.config(); // harus di paling atas

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

// Import middleware (jika mau pakai global, optional)
import { verifyToken, iatChecker } from './middleware/authMiddleware.js';

const app = express();

// Disable cache
app.disable('etag');
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);       // route login/register
app.use('/notes', notesRoutes);     // route notes, sudah import benar

// Basic route
app.get('/', (req, res) => res.send('Hello Bibit'));

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ result: 'fail', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ result: 'fail', error: `Page not found ${req.path}` });
});

// Connect MongoDB
console.log("Connecting to MongoDB:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB connection error ❌", err));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));