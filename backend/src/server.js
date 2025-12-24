require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const { validateNotePayload } = require("./validate");

const app = express();

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: CORS_ORIGIN === "*" ? true : CORS_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "notes-api", time: new Date().toISOString() });
});

// List notes
app.get("/api/notes", (req, res) => {
  const notes = db.listNotes();
  res.json(notes);
});

// Get note by id
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });

  const note = db.getNote(id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  res.json(note);
});

// Create note
app.post("/api/notes", (req, res) => {
  const { ok, errors } = validateNotePayload(req.body);
  if (!ok) return res.status(400).json({ message: "Validation failed", errors });

  const note = db.createNote({
    title: req.body.title.trim(),
    content: req.body.content.trim()
  });
  res.status(201).json(note);
});

// Update note
app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });

  const { ok, errors } = validateNotePayload(req.body);
  if (!ok) return res.status(400).json({ message: "Validation failed", errors });

  const updated = db.updateNote({
    id,
    title: req.body.title.trim(),
    content: req.body.content.trim()
  });

  if (!updated) return res.status(404).json({ message: "Note not found" });
  res.json(updated);
});

// Delete note
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });

  const ok = db.deleteNote(id);
  if (!ok) return res.status(404).json({ message: "Note not found" });

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
