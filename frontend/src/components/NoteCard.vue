<template>
  <div class="card">
    <h4>{{ note.title }}</h4>

    <p class="content">
      {{ note.content }}
    </p>

    <div class="actions">
      <button class="btn" @click="$emit('edit', note)">
        Edit
      </button>
      <button class="btn danger" @click="$emit('delete', note)">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  note: { type: Object, required: true }
});

defineEmits(["edit", "delete"]);
</script>

<style scoped>
.card {
  background: #111827;
  padding: 16px;
  border-radius: 12px;
}
.content {
  white-space: pre-line;
  margin: 10px 0;
}
.actions {
  display: flex;
  gap: 8px;
}
</style>
