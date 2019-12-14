<template>
  <div>
    {{ remaining === 1 ? remaining + ' item' : (remaining === 0 ? 'No items' : remaining + ' items') }} left
  </div>
</template>

<script>
  export default {
    name: "TodoItemRemaining",
    computed : {
      remaining() {
        return this.$store.getters.remaining
      }
    }
  }
</script>

<style scoped>

</style>
