<template>
  <div v-if="open" class="overlay">
    <div class="modal">
      <div class="header">
        <h3>{{ note ? "Edit Note" : "New Note" }}</h3>
        <button class="icon" @click="$emit('close')">✕</button>
      </div>

      <div class="form">
        <input
          class="input"
          v-model="title"
          placeholder="Title"
        />

        <textarea
          class="textarea"
          v-model="content"
          placeholder="Content"
          rows="8"
        />
      </div>

      <div class="actions">
        <button class="btn" @click="$emit('close')" :disabled="saving">
          Cancel
        </button>
        <button
          class="btn primary"
          :disabled="saving"
          @click="submit"
        >
          {{ saving ? "Saving..." : "Save" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  open: Boolean,
  note: Object,
  saving: Boolean
});

const emit = defineEmits(["submit", "close"]);

const title = ref("");
const content = ref("");

watch(
  () => props.note,
  (n) => {
    title.value = n?.title || "";
    content.value = n?.content || "";
  },
  { immediate: true }
);

function submit() {
  emit("submit", {
    title: title.value,
    content: content.value
  });
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  width: 520px;
  background: linear-gradient(145deg, #0f172a, #020617);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.header h3 {
  margin: 0;
}

.icon {
  background: none;
  border: none;
  color: #e5e7eb;
  font-size: 18px;
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input,
.textarea {
  width: 100%;
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 10px 12px;
  color: #e5e7eb;
  font-size: 14px;
}

.textarea {
  resize: vertical;
  min-height: 120px;
}

.input::placeholder,
.textarea::placeholder {
  color: #64748b;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}
</style>
