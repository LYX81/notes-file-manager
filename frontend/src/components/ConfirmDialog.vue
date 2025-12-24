<script setup>
defineProps({
  open: Boolean,
  title: String,
  message: String,
  busy: Boolean,
  confirmText: { type: String, default: "Confirm" }
});
defineEmits(["cancel", "confirm"]);
</script>

<template>
  <div v-if="open" class="modal-backdrop">
    <div class="modal">
      <h3>{{ title }}</h3>
      <pre class="muted">{{ message }}</pre>

      <div class="actions">
        <button class="btn ghost" :disabled="busy" @click="$emit('cancel')">
          Cancel
        </button>
        <button class="btn danger" :disabled="busy" @click="$emit('confirm')">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>
