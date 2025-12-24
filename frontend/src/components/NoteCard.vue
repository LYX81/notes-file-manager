<template>
  <div class="card note-card">
    <div class="note-head">
      <div class="file-badge">DOC</div>
      <div class="note-title-wrap">
        <h3 class="note-title">{{ note.title }}</h3>
        <p class="note-subtitle">Document</p>
      </div>
    </div>

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
