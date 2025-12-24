<template>
  <div class="card">
    <h3>{{ note.title }}</h3>
    <p class="muted">{{ note.content }}</p>

    <div style="display:flex;gap:8px;margin-top:10px;">
      <button class="btn" @click="$emit('edit', note)">Edit</button>
      <button class="btn danger" @click="$emit('delete', note)">Delete</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ note: Object });
</script>
