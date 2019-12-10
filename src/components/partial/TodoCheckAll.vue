<template>
  <div>
    <label>
      <input type="checkbox" :checked="! anyRemaining" @change="checkedAll">
      Check All
    </label>
  </div>
</template>

<script>
  export default {
    name: "TodoCheckAll",
    props : {
      anyRemaining : {
        type : Boolean,
        required : true
      }
    },

    methods : {
      checkedAll() {
        Bus.$emit('allChecked', this.anyRemaining)
      }
    }
  }
</script>

<style scoped>

</style>
