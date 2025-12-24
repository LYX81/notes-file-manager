<template>
  <div class="container">
    <header class="topbar">
      <div>
        <h1>Simple File Management (Notes)</h1>
        <p class="subtitle">CRUD with Vue + Express + SQLite</p>
      </div>

      <div class="actions">
        <input v-model="query" placeholder="Search notes..." />
        <button @click="openCreate">+ New Note</button>
      </div>
    </header>

    <p class="status">
      {{ filtered.length }} note(s) • API: {{ apiStatus }}
    </p>

    <div class="grid">
      <div v-if="filtered.length === 0" class="empty">
        No notes found
      </div>

      <NoteCard
        v-for="n in filtered"
        :key="n.id"
        :note="n"
        @edit="openEdit"
        @delete="askDelete"
      />
    </div>

    <NoteModal
      :open="modalOpen"
      :note="selected"
      :saving="saving"
      @close="closeModal"
      @submit="submitNote"
    />

    <ConfirmDialog
      :open="confirmOpen"
      :busy="deleting"
      title="Delete note?"
      :message="confirmMessage"
      confirmText="Delete"
      @cancel="closeConfirm"
      @confirm="confirmDelete"
    />

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { api } from "./api";
import NoteCard from "./components/NoteCard.vue";
import NoteModal from "./components/NoteModal.vue";
import ConfirmDialog from "./components/ConfirmDialog.vue";

const notes = ref([]);
const query = ref("");
const apiStatus = ref("checking...");
const toast = ref("");

const modalOpen = ref(false);
const confirmOpen = ref(false);
const selected = ref(null);
const toDelete = ref(null);

const saving = ref(false);
const deleting = ref(false);

const filtered = computed(() => {
  const q = query.value.toLowerCase();
  return notes.value.filter(
    n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
  );
});

const confirmMessage = computed(() =>
  toDelete.value
    ? `This will permanently delete:\n\n"${toDelete.value.title}"`
    : ""
);

function showToast(msg) {
  toast.value = msg;
  setTimeout(() => (toast.value = ""), 2500);
}

async function loadNotes() {
  try {
    await api.health();
    apiStatus.value = "online";
    notes.value = await api.listNotes();
  } catch {
    apiStatus.value = "offline";
  }
}

function openCreate() {
  selected.value = null;
  modalOpen.value = true;
}

function openEdit(note) {
  selected.value = note;
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
  selected.value = null;
}

async function submitNote(payload) {
  saving.value = true;
  try {
    if (selected.value) {
      await api.updateNote(selected.value.id, payload);
      showToast("Note updated");
    } else {
      await api.createNote(payload);
      showToast("Note created");
    }
    await loadNotes();
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
    closeConfirm();
    showToast("Note deleted");
    await loadNotes();
  } finally {
    deleting.value = false;
  }
}

onMounted(loadNotes);
</script>
