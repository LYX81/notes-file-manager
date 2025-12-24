<script setup>
defineProps({ note: Object });
defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="card">
    <h4>{{ note.title }}</h4>
    <p class="muted">{{ note.content }}</p>

    <div class="card-actions">
      <button class="btn ghost" @click="$emit('edit', note)">Edit</button>
      <button class="btn danger" @click="$emit('delete', note)">Delete</button>
    </div>
  </div>
</template>
