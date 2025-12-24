<template>
  <div class="container">
    <div class="topbar">
      <div class="brand">
        <div class="logo"></div>
        <div>
          <h1>Simple File Management (Notes)</h1>
          <div class="subtitle">CRUD with Vue + Express + SQLite</div>
        </div>
      </div>

      <div class="actions">
        <input class="input" v-model="query" placeholder="Search notes..." />
        <button class="btn primary" @click="openCreate">+ New Note</button>
      </div>
    </div>

    <div style="margin-top:14px;" class="muted">
      <span v-if="loading" class="skeleton">Loading notes...</span>
      <span v-else>{{ filtered.length }} note(s)</span>
      <span v-if="apiStatus" style="margin-left:10px;">• API: {{ apiStatus }}</span>
    </div>

    <div class="grid">
      <div v-if="loading" v-for="i in 6" :key="i" class="card skeleton" style="height:140px;"></div>

      <template v-else>
        <div v-if="filtered.length === 0" class="card" style="grid-column: 1/-1;">
          <div style="font-weight:800;">No notes found</div>
          <div class="muted" style="margin-top:6px;">
            Try a different keyword, or create your first note.
          </div>
        </div>

        <NoteCard
          v-for="n in filtered"
          :key="n.id"
          :note="n"
          @edit="openEdit"
          @delete="askDelete"
        />
      </template>
    </div>

    <NoteModal
      :open="modalOpen"
      :note="selected"
      :saving="saving"
      @close="closeModal"
      @submit="handleSubmit"
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
  return notes.value.filter((n) => {
    const t = (n.title || "").toLowerCase();
    const c = (n.content || "").toLowerCase();
    return t.includes(q) || c.includes(q);
  });
});

const confirmMessage = computed(() => {
  if (!toDelete.value) return "Are you sure?";
  return `This will permanently delete:\n\n"${toDelete.value.title}"`;
});

function showToast(msg) {
  toast.value = msg;
  setTimeout(() => (toast.value = ""), 2500);
}

async function fetchAll() {
  loading.value = true;
  try {
    const health = await api.health();
    apiStatus.value = health?.ok ? "online" : "unknown";
    notes.value = await api.listNotes();
  } catch (e) {
    apiStatus.value = "offline";
    showToast(e.message || "Failed to load notes");
  } finally {
    loading.value = false;
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
  } catch (e) {
    const detail = e?.data?.errors ? JSON.stringify(e.data.errors) : "";
    showToast(`${e.message}${detail ? " - " + detail : ""}`);
  } finally {
    saving.value = false;
  }
}

function askDelete(note) {
  toDelete.value = note;
  confirmOpen.value = true;
}

function closeConfirm() {
  if (!deleting.value) {
    confirmOpen.value = false;
    toDelete.value = null;
  }
}

async function confirmDelete() {
  if (!toDelete.value) return;

  deleting.value = true;

  try {
    await api.deleteNote(toDelete.value.id);
    confirmOpen.value = false;
    toDelete.value = null;
    showToast("Note deleted 🗑️");
    await fetchAll();
  } catch (e) {
    showToast(e.message || "Delete failed");
  } finally {
    deleting.value = false;
  }
}


onMounted(fetchAll);
</script>
