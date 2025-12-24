<template>
  <div class="container">
    <!-- Header -->
    <header class="topbar">
      <div class="brand">
        <div class="logo"></div>
        <div>
          <h1>Simple File Management (Notes)</h1>
          <p class="subtitle">CRUD with Vue + Express + SQLite</p>
          <p class="status">{{ notes.length }} note(s) • API: {{ apiStatus }}</p>
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
    </header>

    <!-- Notes -->
    <section class="grid">
      <div v-if="!loading && filtered.length === 0" class="empty">
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
    </section>

    <!-- Modals -->
    <NoteModal
      :open="modalOpen"
      :note="selected"
      :saving="saving"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      :open="confirmOpen"
      title="Delete note?"
      :message="confirmMessage"
      :busy="deleting"
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
const loading = ref(false);
const saving = ref(false);
const deleting = ref(false);

const query = ref("");
const apiStatus = ref("offline");
const toast = ref("");

const modalOpen = ref(false);
const selected = ref(null);

const confirmOpen = ref(false);
const toDelete = ref(null);

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

async function fetchAll() {
  loading.value = true;
  try {
    await api.health();
    apiStatus.value = "online";
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
    if (selected.value?.id) {
      await api.updateNote(selected.value.id, payload);
      showToast("Note updated ✅");
    } else {
      await api.createNote(payload);
      showToast("Note created ✅");
    }
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
