<template>
  <div>
    {{ remaining === 1 ? remaining + ' item' : (remaining === 0 ? 'No items' : remaining + ' items') }} left
  </div>
</template>

<script>
  export default {
    name: "TodoItemRemaining",
    props : {
      remaining : {
        type : Number,
        required : true
      }
    }
  }
</script>

<style scoped>

</style>
