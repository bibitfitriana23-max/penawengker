let notes = [
  {
    id: 1,
    title: 'first note',
    content: 'My first note is here.'
  }
];

const list = () => {
  return notes.map(({ id, title }) => ({
    id,
    title,
  }));
};

const get = (id) => {
  const note = notes.find((note) => note.id === id);
  if (!note) {
    throw new Error('Note not found');
  }
  return note;
};

const create = (title, content) => {
  const lastId = notes.length > 0 ? notes[notes.length - 1].id : 0;
  const newNote = {
    id: lastId + 1,
    title,
    content,
  };
  notes.push(newNote);
  return newNote;
};

const update = (id, title, content) => {
  const index = notes.findIndex((note) => note.id === id);
  if (index < 0) {
    throw new Error('Note not found');
  }
  notes[index] = { ...notes[index], title, content };
  return notes[index];
};

// Jenenge tetep 'delete'
const del = (id) => {
  if (!notes.some((note) => note.id === id)) {
    throw new Error('Note not found for delete');
  }
  notes = notes.filter((note) => note.id !== id);
};

export default {
  list,
  get,
  create,
  update,
  delete: del // Diekspor nganggo jeneng 'delete'
};
