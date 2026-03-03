import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "../models/index.js";

dotenv.config();

const router = express.Router();

// REGISTER
router.post('/register', async (req, res, next) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    if (!email || !name || !password || !confirmPassword)
      return res.status(400).json({ message: "Semua field harus diisi" });

    if (password.length < 8 || password.length > 12)
      return res.status(400).json({ message: "Password minimal 8 dan maksimal 12 karakter" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password dan Confirm Password tidak sama" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email sudah terdaftar" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "Registrasi berhasil" });

  } catch (err) {
    next(err);
  }
});

// LOGIN + JWT
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN ATTEMPT:", email, password);

    if (!email || !password)
      return res.status(400).json({ message: "Email dan password harus diisi" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '1h' }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log("ERROR LOGIN:", err);
    next(err);
  }
});

export default router;