<template>
  <div>
    <NuxtLayout>
      <Contact />
      <Calculator />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
useHead({
  title: config.NPM_PACKAGE_NAME || '',
  meta: [
    { name: 'description', content: config.NPM_PACKAGE_DESCRIPTION || '' }
  ]
});
</script>
