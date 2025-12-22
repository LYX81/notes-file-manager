<template>
  <div class="card" style="display:flex; flex-direction:column; gap:10px;">
    <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px;">
      <div style="min-width:0;">
        <div style="font-weight:700; font-size:14px; margin-bottom:4px; word-break:break-word;">
          {{ note.title }}
        </div>
        <div class="muted" style="font-size:12px;">
          Updated {{ niceTime(note.updatedAt) }}
        </div>
      </div>

      <div style="display:flex; gap:8px; flex-shrink:0;">
        <button class="btn" @click="$emit('edit', note)">Edit</button>
        <button class="btn danger" @click="$emit('delete', note)">Delete</button>
      </div>
    </div>

    <div class="muted" style="font-size:13px; white-space:pre-wrap; word-break:break-word; line-height:1.5;">
      {{ preview }}
    </div>

    <div v-if="isTruncated" class="muted" style="font-size:12px;">
      (Content truncated… open Edit to view full)
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  note: { type: Object, required: true }
});

const MAX = 220;

const preview = computed(() => {
  const c = props.note.content || "";
  return c.length > MAX ? c.slice(0, MAX) + "…" : c;
});

const isTruncated = computed(() => (props.note.content || "").length > MAX);

function niceTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}
</script>
