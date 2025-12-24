<template>
  <div v-if="open" class="overlay">
    <div class="modal small">
      <div class="modal-head">
        <h2>{{ title }}</h2>
        <button class="icon-btn" @click="$emit('cancel')" aria-label="Close">✕</button>
      </div>

      <pre class="message">{{ message }}</pre>

      <div class="modal-actions">
        <button class="btn ghost" @click="$emit('cancel')">Cancel</button>
        <button class="btn danger" :disabled="busy" @click="$emit('confirm')">
          {{ busy ? "Deleting..." : "Delete" }}
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
