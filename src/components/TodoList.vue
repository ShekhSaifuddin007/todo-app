<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">

      <todo-item v-for="todo in todosFiltered"
                 :key="todo.id"
                 :todo="todo"
                 :checkAll="! anyRemaining"
      />

    </transition-group>

    <div class="extra-container" v-if="todosFiltered.length">
      <todo-check-all/>
      <todo-item-remaining/>
    </div>

    <div class="extra-container">
      <todo-filtered/>

      <div>
        <transition name="fade">
          <todo-clear-button/>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
  import TodoItem from "./partial/TodoItem";
  import TodoItemRemaining from "./partial/TodoItemRemaining";
  import TodoCheckAll from "./partial/TodoCheckAll";
  import TodoFiltered from "./partial/TodoFiltered";
  import TodoClearButton from "./partial/TodoClearButton";
  export default {
    name: 'TodoList',
    components : {
      TodoItem, TodoItemRemaining, TodoClearButton,
      TodoCheckAll, TodoFiltered,
    },
    data () {
      return {
        newTodo : '',
        todoId : 3,
      }
    },

    created() {
      this.$store.dispatch('retrieveTodos');
    },

    computed : {
      anyRemaining() {
        return this.$store.getters.anyRemaining
      },
      todosFiltered() {
        return this.$store.getters.todosFiltered
      }
    },

    methods : {
      addTodo() {
        if (this.newTodo.trim().length === 0) {
          return;
        }

        this.$store.dispatch('addTodo', {
          id : this.todoId,
          title : this.newTodo,
        });
        this.newTodo = '';
        this.todoId++;
      },
    }
  }
</script>

<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
      border: 1px solid #666;
      padding: 3px 5px;
      background: red;
    }
  }
  .todo-item-left { // later
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; //override defaults
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    &:hover {
      background: lightgreen;
    }
    &:focus {
      outline: none;
    }
  }
  .active {
    background: lightgreen;
  }
  // CSS Transitions
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>