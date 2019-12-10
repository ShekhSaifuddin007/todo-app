<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div v-if="! editing" @dblclick="editTodo" class="todo-item-label" :class="{ completed : todo.completed }">{{ title }}</div>
      <input v-else class="todo-item-edit" type="text"
             v-model="title" @keyup.enter="doneEdit"
             @blur="doneEdit" @keyup.esc="cancelEdit"
             v-focus>
    </div>
    <div>
      <button @click="pluralize">Plural</button>
      <span class="remove-item" @click="remove(index)">&times</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TodoItem",
    props : {
      todo : {
        type : Object,
        required : true
      },
      index : {
        type: Number,
        required: true
      },
      checkAll : {
        type: Boolean,
        required: true
      }
    },

    data() {
      return {
        id : this.todo.id,
        title : this.todo.title,
        completed : this.todo.completed,
        editing : this.todo.editing,
        cacheTitle : '',
      }
    },

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },

    created() {
      Bus.$on('pluralize', this.handlePluralize);
    },

    beforeDestroy() {
      Bus.$off('pluralize', this.handlePluralize);
    },

    watch : {
      checkAll() {
        // if (this.checkAll) {
        //   this.completed = true
        // } else {
        //   this.completed = this.todo.completed
        // }
        this.completed = this.checkAll ? true : this.todo.completed;
      },
    },

    methods : {
      remove(index) {
        Bus.$emit('removedTodo', index);
      },
      editTodo() {
        this.cacheTitle = this.title;
        this.editing = true;
      },
      doneEdit() {
        if (this.title.trim() === '') {
          this.title = this.cacheTitle
        }
        this.editing = false;
        this.finishEdit();
      },
      cancelEdit() {
        this.title = this.cacheTitle;
        this.editing = false;
      },
      finishEdit() {
        Bus.$emit('finishedEdit', {
          index : this.index,
          todo : {
            id : this.id,
            title : this.title,
            completed : this.completed,
            editing : this.editing,
            cacheTitle : '',
          }
        });
      },
      pluralize() {
        Bus.$emit('pluralize')
      },
      handlePluralize () {
        this.title = this.title + 's';
        this.finishEdit()
      }
    }
  }
</script>

<style scoped>

</style>
