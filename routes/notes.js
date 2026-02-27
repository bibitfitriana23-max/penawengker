import { Router } from "express";
import { Post } from "../models/index.js";

const router = Router();


// =======================
// GET ALL NOTES
// =======================
router.get("/", async (req, res, next) => {
  try {
    const notes = await Post.find();
    return res.json(notes);
  } catch (e) {
    next(e);
  }
});


// =======================
// GET NOTE BY ID
// =======================
router.get("/:id", async (req, res, next) => {
  const id = req.params.id; // JANGAN Number()

  try {
    const result = await Post.findById(id);

    if (!result) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json(result);
  } catch (e) {
    next(e);
  }
});


// =======================
// CREATE NOTE
// =======================
router.post("/", async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  try {
    const newNote = await Post.create({
      title,
      content,
    });

    return res.status(201).json(newNote);
  } catch (e) {
    next(e);
  }
});


// =======================
// UPDATE NOTE
// =======================
router.put("/:id", async (req, res, next) => {
  const id = req.params.id; // jangan Number()
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  try {
    const updatedNote = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // return data terbaru
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json(updatedNote);
  } catch (e) {
    next(e);
  }
});


// =======================
// DELETE NOTE
// =======================
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id; // JANGAN Number()

  try {
    const deletedNote = await Post.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json({
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (e) {
    next(e);
  }
});

export default router;