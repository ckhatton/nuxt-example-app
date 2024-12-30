<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-4">
    <h2 class="text-2xl">Calculator 🔢</h2>
    <p class="my-4">
      This is a simple calculator, but it sends the data to my own created API (within the application) using fetch and H3.
    </p>
    <p class="my-4">
      It prevents a GET request; you will see this if you route to <a href="/api/calculate">"/api/calculate"</a>.
    </p>
    <form
      @submit.prevent="handleForm">
      <div class="flex items-center mb-4 text-2xl">
        <input v-model="form.operand01" type="number" class="p-4" />
        <span> + </span>
        <input v-model="form.operand02" type="number" class="p-4" />
      </div>
      <div class="flex items-center">
        <button type="submit" class="mr-4 bg-blue text-white p-4 rounded-lg">Calculate</button>
        <p v-if="message?.text !== ''" class="text-lg">{{ message?.text }}</p>
      </div>
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
        operand02: 0
      },
      message: {
        error: false,
        text: ''
      }
    }
  },
  
  methods: {
    async handleForm(_event) {
      try {
        const response = await $fetch( '/api/calculate', {
          method: 'POST',
          body: this.form
        });
        this.message = response;
      } catch (error) {
        console.log(error);
        this.message = {
          error: true,
          text: error.toString()
        }
      }
    }
  }
}
</script>
