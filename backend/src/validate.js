function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function validateNotePayload(body) {
  const errors = {};
  if (!isNonEmptyString(body.title)) errors.title = "Title is required";
  if (!isNonEmptyString(body.content)) errors.content = "Content is required";

  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = { validateNotePayload };
