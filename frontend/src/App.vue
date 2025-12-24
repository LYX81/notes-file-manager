<template>
  <div class="container">
    <!-- Top Bar -->
    <div class="topbar">
      <div class="brand">
        <div class="logo"></div>
        <div>
          <h1>Simple File Management (Notes)</h1>
          <div class="subtitle">CRUD with Vue + Express + SQLite</div>
        </div>
      </div>

      <div class="actions">
        <input
          class="input"
          v-model="query"
          placeholder="Search notes..."
        />
        <button class="btn primary" @click="openCreate">
          + New Note
        </button>
      </div>
    </div>

    <!-- Status -->
    <div class="muted" style="margin-top:14px;">
      <span v-if="loading">Loading notes...</span>
      <span v-else>{{ filtered.length }} note(s)</span>
      <span v-if="apiStatus" style="margin-left:10px;">
        • API: {{ apiStatus }}
      </span>
    </div>

    <!-- Notes Grid -->
    <div class="grid">
      <div
        v-if="!loading && filtered.length === 0"
        class="empty-state"
      >
        <div class="empty-card">
          <h3>No notes yet</h3>
          <p>Create your first note to get started.</p>
          <button class="btn primary" @click="openCreate">
            + Create your first note
          </button>
        </div>
      </div>

        <h3>No notes yet</h3>
        <p>Create your first note to get started.</p>
      </div>

      <NoteCard
        v-for="note in filtered"
        :key="note.id"
        :note="note"
        @edit="openEdit"
        @delete="askDelete"
      />
    </div>

    <!-- Create / Edit Modal -->
    <NoteModal
      :open="modalOpen"
      :note="selected"
      :saving="saving"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation -->
    <ConfirmDialog
      :open="confirmOpen"
      :busy="deleting"
      title="Delete note?"
      :message="confirmMessage"
      confirmText="Delete"
      @cancel="closeConfirm"
      @confirm="confirmDelete"
    />

    <!-- Toast -->
    <div v-if="toast" class="toast">
      {{ toast }}
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { api } from "./api";
import NoteCard from "./components/NoteCard.vue";
import NoteModal from "./components/NoteModal.vue";
import ConfirmDialog from "./components/ConfirmDialog.vue";

const notes = ref([]);
const loading = ref(true);
const saving = ref(false);
const deleting = ref(false);

const query = ref("");
const toast = ref("");
const apiStatus = ref("");

const modalOpen = ref(false);
const selected = ref(null);

const confirmOpen = ref(false);
const toDelete = ref(null);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return notes.value;
  return notes.value.filter(n =>
    (n.title + n.content).toLowerCase().includes(q)
  );
});

const confirmMessage = computed(() =>
  toDelete.value
    ? `This will permanently delete:\n\n"${toDelete.value.title}"`
    : "Are you sure?"
);

function showToast(msg) {
  toast.value = msg;
  setTimeout(() => (toast.value = ""), 2200);
}

async function fetchAll() {
  loading.value = true;
  try {
    const health = await api.health();
    apiStatus.value = health?.ok ? "online" : "offline";
    notes.value = await api.listNotes();
  } catch {
    apiStatus.value = "offline";
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  selected.value = null;
  modalOpen.value = true;
}

function openEdit(note) {
  selected.value = { ...note };
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
  selected.value = null;
}

async function handleSubmit(payload) {
  saving.value = true;
  try {
    selected.value?.id
      ? await api.updateNote(selected.value.id, payload)
      : await api.createNote(payload);

    showToast("Saved successfully ✅");
    await fetchAll();
    closeModal();
  } finally {
    saving.value = false;
  }
}

function askDelete(note) {
  toDelete.value = note;
  confirmOpen.value = true;
}

function closeConfirm() {
  confirmOpen.value = false;
  toDelete.value = null;
}

async function confirmDelete() {
  if (!toDelete.value) return;
  deleting.value = true;
  try {
    await api.deleteNote(toDelete.value.id);
    showToast("Note deleted 🗑️");
    await fetchAll();
  } finally {
    deleting.value = false;
    closeConfirm();
  }
}

onMounted(fetchAll);
</script>
