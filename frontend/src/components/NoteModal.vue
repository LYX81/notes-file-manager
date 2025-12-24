<template>
  <div v-if="open" class="overlay">
    <div class="modal">
      <h2>New Note</h2>

      <input
        class="input"
        placeholder="Title"
        v-model="title"
      />

      <textarea
        class="textarea"
        placeholder="Content"
        v-model="content"
      />

      <div class="modal-actions">
        <button class="btn ghost" @click="$emit('close')">Cancel</button>
        <button class="btn primary" :disabled="saving" @click="submit">
          Save
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
