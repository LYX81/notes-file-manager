<template>
  <div class="card">
    <h3 class="title">{{ note.title }}</h3>

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
  note: {
    type: Object,
    required: true
  }
});
</script>
