<template>
  <div v-if="open" @click.self="close" style="position:fixed; inset:0; background:rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; padding:16px;">
    <div class="card" style="width:min(720px, 96vw);">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:10px;">
        <div>
          <div style="font-weight:800; font-size:15px;">
            {{ modeTitle }}
          </div>
          <div class="muted" style="font-size:12px;">
            Title and content are required.
          </div>
        </div>

        <button class="btn ghost" @click="close">✕</button>
      </div>

      <div style="display:flex; flex-direction:column; gap:10px;">
        <input class="input" v-model="local.title" placeholder="Note title" maxlength="120" />
        <textarea
          class="input"
          v-model="local.content"
          placeholder="Write your note..."
          rows="10"
          style="resize:vertical; min-height:180px;"
        />
        <div v-if="error" style="font-size:13px; color:rgba(255,120,140,0.95);">
          {{ error }}
        </div>

        <div style="display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap;">
          <button class="btn" @click="close" :disabled="saving">Cancel</button>
          <button class="btn primary" @click="submit" :disabled="saving">
            {{ saving ? "Saving..." : (isEdit ? "Update Note" : "Create Note") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from "vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  note: { type: Object, default: null },
  saving: { type: Boolean, default: false }
});

const emit = defineEmits(["close", "submit"]);

const local = reactive({ title: "", content: "" });
const error = reactive({ msg: "" });

const isEdit = computed(() => !!props.note?.id);
const modeTitle = computed(() => (isEdit.value ? "Edit Note" : "New Note"));

watch(
  () => props.open,
  (v) => {
    if (v) {
      local.title = props.note?.title ?? "";
      local.content = props.note?.content ?? "";
      error.msg = "";
    }
  }
);

function close() {
  if (!props.saving) emit("close");
}

function submit() {
  const title = (local.title || "").trim();
  const content = (local.content || "").trim();
  if (!title) return (error.msg = "Title is required.");
  if (!content) return (error.msg = "Content is required.");

  error.msg = "";
  emit("submit", { title, content });
}
</script>

<script>
export default {
  computed: {
    error() {
      return this.$.setupState?.error?.msg;
    }
  }
};
</script>
