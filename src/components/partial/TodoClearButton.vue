<template>
  <button v-if="showClearCompleted" @click="clearCompleted">Clear Completed</button>
</template>

<script>
  export default {
    name: "TodoClearButton",
    props : {
      showClearCompleted : {
        type : Boolean,
        required : true,
      }
    },

    methods : {
      clearCompleted() {
        Bus.$emit('clearCompletedTodos')
      }
    }
  }
</script>

<style scoped>

</style>
