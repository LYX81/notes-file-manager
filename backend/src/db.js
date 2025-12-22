const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const dbFile = process.env.DB_FILE || "./data/notes.sqlite";
const dbDir = path.dirname(dbFile);
ensureDir(dbDir);

const db = new Database(dbFile);

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`);

const stmtCreate = db.prepare(`
  INSERT INTO notes (title, content, createdAt, updatedAt)
  VALUES (@title, @content, @createdAt, @updatedAt)
`);

const stmtList = db.prepare(`
  SELECT id, title, content, createdAt, updatedAt
  FROM notes
  ORDER BY datetime(updatedAt) DESC
`);

const stmtGet = db.prepare(`
  SELECT id, title, content, createdAt, updatedAt
  FROM notes
  WHERE id = ?
`);

const stmtUpdate = db.prepare(`
  UPDATE notes
  SET title = @title, content = @content, updatedAt = @updatedAt
  WHERE id = @id
`);

const stmtDelete = db.prepare(`
  DELETE FROM notes WHERE id = ?
`);

module.exports = {
  createNote({ title, content }) {
    const now = new Date().toISOString();
    const info = stmtCreate.run({
      title,
      content,
      createdAt: now,
      updatedAt: now
    });
    return this.getNote(info.lastInsertRowid);
  },

  listNotes() {
    return stmtList.all();
  },

  getNote(id) {
    return stmtGet.get(id);
  },

  updateNote({ id, title, content }) {
    const now = new Date().toISOString();
    const info = stmtUpdate.run({ id, title, content, updatedAt: now });
    if (info.changes === 0) return null;
    return this.getNote(id);
  },

  deleteNote(id) {
    const info = stmtDelete.run(id);
    return info.changes > 0;
  }
};
