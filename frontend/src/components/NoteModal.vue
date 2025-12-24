<template>
  <div v-if="open" class="modal-backdrop">
    <div class="modal">
      <h2>{{ note ? "Edit Note" : "New Note" }}</h2>

      <input
        class="input"
        placeholder="Title"
        v-model="local.title"
      />

      <textarea
        placeholder="Content"
        v-model="local.content"
      ></textarea>

      <div class="modal-actions">
        <button class="btn" @click="$emit('close')">Cancel</button>
        <button class="btn primary" :disabled="saving" @click="submit">
          {{ saving ? "Saving..." : "Save" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  open: Boolean,
  note: Object,
  saving: Boolean
});

const emit = defineEmits(["submit","close"]);

const local = reactive({ title: "", content: "" });

watch(
  () => props.open,
  (v) => {
    if (v) {
      local.title = props.note?.title ?? "";
      local.content = props.note?.content ?? "";
    }
  }
);

function submit() {
  emit("submit", {
    title: local.title,
    content: local.content
  });
}
</script>
