<template>
  <div class="bg-blue mb-4 p-8 rounded-lg shadow-lg font-bold text-sm text-white tracking-wider flex flex-wrap justify-between items-center">
    <h1>Built with Vue.js using Nuxt.js framework and styled with Tailwind CSS <a class="underline" href="https://github.com/ckhatton/nuxt-example-app" target="_blank">(source code)</a></h1>
    <h2 id="date">
      <span class="time">{{ time }}</span>&nbsp;
      <span class="date">{{ new Date().toLocaleDateString() }}</span>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  
  data() {
    return {
      time: `00:00:00`
    }
  },

  methods: {
    tick() {
      this.time = new Date().toLocaleTimeString();
    }
  },
  
  mounted: function() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  },
  
  unmounted: function() {
    clearInterval(this.timerID);
  }
};
</script>
