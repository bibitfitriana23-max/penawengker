import { Router } from 'express';
import note from '../models/note.js';
import { Post } from '../models/index.js';

const router = Router();

// GET semua notes
router.get('/', async (req, res, next) => {
  try {
    const notes = await Post.find(); // Menggunakan Post.find() untuk mengambil semua dokumen dari koleksi Post
    res.json(notes);
  } catch (e) {
    next(e);
  }
});

// GET note by id
router.get('/:id', async (req, res, next) => {
  const id = req.params.id; // JANGAN di-Number-kan kalau pakai MongoDB/Mongoose
  try {
    // Gunakan findById (huruf I besar)
    const result = await Post.findById(id); 
    
    if (!result) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    return res.json(result);
  } catch (e) {
    // Kalau ID-nya ngawur formatnya, dia lari ke sini
    next(e);
  }
});

// POST create note
router.post('/', async (req, res, next) => {
  const { title, content } = req.body;
  try {
    //const newNote = note.create(title, content);
    const note = await Post.create({
      title: title,
      content: content,
    });
    return res.status(201).json(note);
  } catch (e) {
    next(e);
  }
});

// PUT update note
router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  try {
    // SING PENTING: Ojo nganggo 'const note = ...' mergo jeneng 'note' wis dinggo import ing ndhuwur!
    const updated = await Post.updateOne(
      { _id: id },
      { title: title, content: content }
    );
    return res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE note
router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const deleted = await Post.deleteOne({ _id: id });
    if (deleted.deletedCount === 0) {
      throw new Error('Note not found');
    }
    return res.json({
      message: 'Note deleted successfully',
      id: id
    });
  } catch (e) {
    next(e);
  }
});

export default router;
