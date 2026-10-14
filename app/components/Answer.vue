<template>
  <div class="answer" :class="{ error }" role="status" aria-live="polite">
    <span class="label">{{ error ? 'Check your input' : 'Answer' }}</span>
    <p class="value"><slot /></p>
  </div>
</template>

<script>
export default {
  name: 'Answer',

  props: {
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.answer {
  padding: 0.75rem 1rem;
  border-left: 4px solid #225378;
  border-radius: 0.375rem;
  background: #eef3f8;
}

.answer.error {
  border-left-color: #b7791f;
  background: #fdf6e8;
}

.label {
  display: block;
  margin-bottom: 0.15rem;
  color: #225378;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.error .label {
  color: #975a16;
}

.value {
  font-size: 1.15rem;
  font-weight: 600;
}
</style>
