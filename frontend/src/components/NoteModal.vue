<script setup>
import { watch, ref } from "vue";

const props = defineProps({
  open: Boolean,
  note: Object,
  saving: Boolean
});
const emit = defineEmits(["close", "submit"]);

const title = ref("");
const content = ref("");

watch(
  () => props.open,
  (open) => {
    if (open) {
      title.value = props.note?.title || "";
      content.value = props.note?.content || "";
    }
  }
);

function submit() {
  emit("submit", { title: title.value, content: content.value });
}
</script>

<template>
  <div v-if="open" class="modal-backdrop">
    <div class="modal">
      <h3>New Note</h3>

      <input v-model="title" placeholder="Title" />
      <textarea v-model="content" placeholder="Content" />

      <div class="actions">
        <button class="btn ghost" @click="$emit('close')">Cancel</button>
        <button class="btn primary" :disabled="saving" @click="submit">
          {{ saving ? "Saving..." : "Save" }}
        </button>
      </div>
    </div>
  </div>
</template>
