const API_BASE = import.meta.env.VITE_API_BASE;

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.message || "Request failed");
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  health: () => request("/api/health"),
  listNotes: () => request("/api/notes"),
  createNote: (payload) =>
    request("/api/notes", { method: "POST", body: JSON.stringify(payload) }),
  updateNote: (id, payload) =>
    request(`/api/notes/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteNote: (id) =>
    request(`/api/notes/${id}`, { method: "DELETE" })
};
