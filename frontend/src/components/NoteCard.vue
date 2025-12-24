<template>
  <div class="card">
    <h3>{{ note.title }}</h3>
    <p class="content">{{ note.content }}</p>

    <div class="card-actions">
      <button class="btn ghost" @click="$emit('edit', note)">Edit</button>
      <button class="btn danger" @click="$emit('delete', note)">Delete</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ note: Object });
</script>
