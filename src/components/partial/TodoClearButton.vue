<template>
  <button v-if="showClearCompleted" @click="clearCompleted">Clear Completed</button>
</template>

<script>
  export default {
    name: "TodoClearButton",
    computed : {
      showClearCompleted() {
        return this.$store.getters.showClearCompleted
      }
    },

    methods : {
      clearCompleted() {
        this.$store.dispatch('clearCompleted');
      }
    }
  }
</script>

<style scoped>

</style>
