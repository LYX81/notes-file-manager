<template>
  <div v-if="open" class="modal-backdrop">
    <div class="modal">
      <h3>{{ note ? "Edit Note" : "New Note" }}</h3>

      <input v-model="title" placeholder="Title" />
      <textarea v-model="content" placeholder="Content"></textarea>

      <div class="actions">
        <button @click="emit('close')">Cancel</button>
        <button @click="submit" :disabled="saving">
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

const emit = defineEmits(["close", "submit"]);

const title = ref("");
const content = ref("");

watch(
  () => props.open,
  (open) => {
    if (open) {
      title.value = props.note?.title || "";
      content.value = props.note?.content || "";
    } else {
      title.value = "";
      content.value = "";
    }
  }
);

function submit() {
  emit("submit", { title: title.value, content: content.value });
}
</script>
