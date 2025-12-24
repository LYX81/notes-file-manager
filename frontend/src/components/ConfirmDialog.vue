<template>
  <div class="overlay">
    <div class="dialog">
      <h3 class="title">{{ title }}</h3>

      <p class="message" v-if="message">
        {{ message }}
      </p>

      <div class="actions">
        <button
          class="btn"
          :disabled="busy"
          @click.stop="$emit('cancel')"
        >
          Cancel
        </button>

        <button
          class="btn danger"
          :disabled="busy"
          @click.stop="$emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  message: { type: String, default: "" },
  confirmText: { type: String, default: "Confirm" },
  busy: { type: Boolean, default: false }
});

defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.dialog {
  background: #111827;
  padding: 20px;
  border-radius: 14px;
  width: 420px;
}
.title {
  margin: 0 0 10px;
}
.message {
  white-space: pre-line;
  margin-bottom: 16px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
