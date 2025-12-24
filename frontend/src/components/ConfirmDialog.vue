<template>
  <div v-if="open" class="modal-backdrop">
    <div class="modal">
      <h3>{{ title }}</h3>
      <pre>{{ message }}</pre>

      <div class="actions">
        <button @click="$emit('cancel')" :disabled="busy">Cancel</button>
        <button class="danger" @click="$emit('confirm')" :disabled="busy">
          {{ busy ? "Deleting..." : confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  busy: Boolean,
  title: String,
  message: String,
  confirmText: String
});
</script>
