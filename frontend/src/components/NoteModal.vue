<template>
  <div v-if="open" class="overlay">
    <div class="modal">
      <div class="modal-head">
        <h2>{{ note?.id ? "Edit Note" : "New Note" }}</h2>
        <button class="icon-btn" @click="$emit('close')" aria-label="Close">✕</button>
      </div>

      <div class="field">
        <label class="label">Title</label>
        <input
          class="input"
          placeholder="E.g. Meeting Notes"
          v-model="title"
        />
      </div>

      <div class="field">
        <label class="label">Content</label>
        <textarea
          class="textarea"
          placeholder="Write something..."
          v-model="content"
        />
      </div>

      <div class="modal-actions">
        <button class="btn ghost" @click="$emit('close')">Cancel</button>
        <button class="btn primary" :disabled="saving" @click="submit">
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
  () => props.open,
  open => {
    if (open) {
      title.value = props.note?.title || "";
      content.value = props.note?.content || "";
    }
  }
);

function submit() {
  emit("submit", {
    title: title.value.trim(),
    content: content.value.trim()
  });
}
</script>
