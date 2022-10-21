<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-4">
    <form
      @submit.prevent="handleForm">
      <div class="flex items-center mb-4 text-2xl">
        <input v-model="form.operand01" type="number" class="p-4" />
        <span> + </span>
        <input v-model="form.operand02" type="number" class="p-4" />
      </div>
      <button type="submit" class="bg-blue text-white p-4 rounded-lg">Calculate</button>
      <p v-if="message?.text !== ''" class="text-lg">{{ message?.text }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Calculator',

  data () {
    return {
      form: {
        operand01: 0,
        operand02: 0,
        operation: 'add'
      },
      message: {
        error: false,
        text: ''
      }
    }
  },
  
  methods: {
    async handleForm(event) {
      try {
        const response = await $fetch( '/api/calculate', {
          method: 'POST',
          body: this.form
        });
        this.message = response.data;
      } catch (error) {
        console.log(error);
        this.message = error.data;
      }
    }
  }
}
</script>
