<template>
  <div v-if="open" class="overlay">
    <div class="modal">
      <div class="header">
        <h3>{{ note ? "Edit Note" : "New Note" }}</h3>
        <button class="icon" @click="$emit('close')">✕</button>
      </div>

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
}
.modal {
  background: #111827;
  padding: 20px;
  border-radius: 14px;
  width: 520px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}
</style>
