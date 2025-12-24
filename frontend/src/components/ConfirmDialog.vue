<template>
  <div v-if="open" class="overlay">
    <div class="modal small">
      <h2>{{ title }}</h2>
      <pre class="message">{{ message }}</pre>

      <div class="modal-actions">
        <button class="btn ghost" @click="$emit('cancel')">Cancel</button>
        <button class="btn danger" :disabled="busy" @click="$emit('confirm')">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  title: String,
  message: String,
  busy: Boolean
});
</script>
