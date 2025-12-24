<template>
  <div v-if="open" class="modal-backdrop">
    <div class="modal">
      <h2>{{ title }}</h2>
      <p style="white-space: pre-line">{{ message }}</p>

      <div class="modal-actions">
        <button class="btn" @click="$emit('cancel')">Cancel</button>
        <button class="btn danger" :disabled="busy" @click="$emit('confirm')">
          {{ busy ? "Deleting..." : confirmText }}
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
  confirmText: String,
  busy: Boolean
});
</script>
