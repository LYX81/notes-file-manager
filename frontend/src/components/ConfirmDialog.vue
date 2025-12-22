<template>
  <div v-if="open" @click.self="$emit('cancel')" style="position:fixed; inset:0; background:rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; padding:16px;">
    <div class="card" style="width:min(520px, 96vw);">
      <div style="font-weight:800; font-size:15px; margin-bottom:6px;">
        {{ title }}
      </div>
      <div class="muted" style="font-size:13px; line-height:1.5; white-space:pre-wrap;">
        {{ message }}
      </div>

      <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:14px; flex-wrap:wrap;">
        <button class="btn" @click="$emit('cancel')" :disabled="busy">Cancel</button>
        <button class="btn danger" @click="$emit('confirm')" :disabled="busy">
          {{ busy ? "Deleting..." : confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
  busy: { type: Boolean, default: false },
  title: { type: String, default: "Confirm" },
  message: { type: String, default: "Are you sure?" },
  confirmText: { type: String, default: "Confirm" }
});

defineEmits(["confirm", "cancel"]);
</script>
