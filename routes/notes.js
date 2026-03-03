import { Router } from "express";
import { Post } from "../models/index.js"; // sesuaikan model Post kalau ada
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// GET ALL NOTES
router.get("/", async (req, res, next) => {
  try {
    const notes = await Post.find();
    return res.json(notes);
  } catch (e) { next(e); }
});

// GET NOTE BY ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Post.findById(id);
    if (!result) return res.status(404).json({ message: "Note not found" });
    return res.json(result);
  } catch (e) { next(e); }
});

// CREATE NOTE
router.post("/", async (req, res, next) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) return res.status(400).json({ message: "Title, content, and author are required" });
  try {
    const newNote = await Post.create({ title, content, author });
    return res.status(201).json(newNote);
  } catch (e) { next(e); }
});

// UPDATE NOTE
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { title, content, author } = req.body;
  if (!title || !content || !author) return res.status(400).json({ message: "Title, content, and author are required" });
  try {
    const updatedNote = await Post.findByIdAndUpdate(id, { title, content, author }, { new: true });
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    return res.json(updatedNote);
  } catch (e) { next(e); }
});

// DELETE NOTE
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedNote = await Post.findByIdAndDelete(id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    return res.json({ message: "Note deleted successfully", data: deletedNote });
  } catch (e) { next(e); }
});

export default router;