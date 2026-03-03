// ./middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware cek JWT dan validitas
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token tidak ditemukan' });

  const token = authHeader.split(' ')[1]; // "Bearer tokenvalue"
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan info user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};

// Middleware cek umur token (iat)
export const iatChecker = (req, res, next) => {
  try {
    const iat = req.user.iat; // ambil iat dari JWT payload
    const now = Math.floor(Date.now() / 1000); // detik sekarang

    if (now - iat > 30) { 
      return res.status(401).json({ result: "fail", message: "Token sudah terlalu lama" });
    }

    next(); // lanjut ke route
  } catch (err) {
    res.status(500).json({ result: "fail", message: err.message });
  }
};