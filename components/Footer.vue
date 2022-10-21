<template>
  <div class="bg-blue mb-4 p-8 rounded-lg shadow-lg text-white tracking-wider font-extrabold flex flex-wrap justify-between items-center">
    <h1 class="text-base">Built with Vue.js using Nuxt.js framework and styled with Tailwind CSS <a class="underline" href="https://github.com/ckhatton/nuxt-example-app" target="_blank">(source code)</a></h1>
    <h2 id="date" class="text-base">
      <span>{{ time }}</span>
      <span>{{ new Date().toLocaleDateString() }}</span>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  
  data() {
    return {
      time: new Date().toLocaleTimeString()
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
