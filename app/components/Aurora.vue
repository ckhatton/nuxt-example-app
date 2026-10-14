<template>
  <div class="aurora" aria-hidden="true">
    <span class="blob navy" />
    <span class="blob steel" />
    <span class="blob sky" />
    <span class="blob indigo" />
    <div class="dots" />
    <div class="spotlight" />
  </div>
</template>

<script>
export default {
  name: 'Aurora',

  mounted() {
    window.addEventListener('pointermove', this.follow);
  },

  unmounted() {
    window.removeEventListener('pointermove', this.follow);
  },

  methods: {
    // Moves the spotlight to follow the mouse
    follow(event) {
      this.$el.style.setProperty('--x', `${event.clientX}px`);
      this.$el.style.setProperty('--y', `${event.clientY}px`);
    },
  },
};
</script>

<style scoped>
.aurora {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: #e9f0f6;
}

/* Soft colour blobs, drifting slowly behind the cards */
.blob {
  position: absolute;
  width: 65vmax;
  height: 65vmax;
  border-radius: 50%;
  animation: drift 26s ease-in-out infinite alternate;
  will-change: transform;
}

.navy {
  top: -25vmax;
  left: -15vmax;
  background: radial-gradient(circle, rgba(34, 83, 120, 0.55), transparent 62%);
}

.steel {
  top: 5vh;
  right: -25vmax;
  background: radial-gradient(circle, rgba(79, 134, 179, 0.5), transparent 62%);
  animation-duration: 32s;
  animation-delay: -8s;
}

.sky {
  bottom: -30vmax;
  left: 15vw;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.38), transparent 62%);
  animation-duration: 38s;
  animation-delay: -14s;
}

.indigo {
  top: 35vh;
  left: -25vmax;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.28), transparent 62%);
  animation-duration: 30s;
  animation-delay: -20s;
}

/* Fine dot grid, fading out towards the edges */
.dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(34, 83, 120, 0.22) 1px, transparent 1.5px);
  background-size: 22px 22px;
  mask-image: radial-gradient(ellipse at center, black 35%, transparent 85%);
}

/* A soft glow that follows the mouse */
.spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    500px circle at var(--x, 50%) var(--y, 25%),
    rgba(255, 255, 255, 0.55),
    transparent 45%
  );
}

@keyframes drift {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(12vmax, 6vmax) scale(1.15);
  }
  100% {
    transform: translate(-6vmax, 12vmax) scale(0.92);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blob {
    animation: none;
  }
}
</style>
