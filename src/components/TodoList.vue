<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">

      <todo-item v-for="(todo, index) in todosFiltered"
                 :key="todo.id"
                 :todo="todo"
                 :index="index"
                 :checkAll="! anyRemaining"
      />

    </transition-group>

    <div class="extra-container" v-if="todosFiltered.length">
      <todo-check-all :anyRemaining="anyRemaining"/>
      <todo-item-remaining :remaining="remaining"/>
    </div>

    <div class="extra-container">
      <todo-filtered/>

      <div>
        <transition name="fade">
          <todo-clear-button :showClearCompleted="showClearCompleted"/>
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
        filter : 'all',
        newTodo : '',
        todoId : 3,
        cacheTitle : '',
        todos : [
          {
            id: 1,
            title: 'Finish Vue Screencast',
            completed: false,
            editing: false,
          },
          {
            id: 2,
            title: 'Take over world',
            completed: false,
            editing: false,
          },
        ]
      }
    },

    created() {
      Bus.$on('removedTodo', (index) => this.remove(index));
      Bus.$on('finishedEdit', (data) => this.finishedEdit(data));
      Bus.$on('allChecked', (check) => this.checkAllTodos(check));
      Bus.$on('filterChanged', (filter) => this.filter = filter);
      Bus.$on('clearCompletedTodos', () => this.clearCompleted());
    },

    beforeDestroy() {
      Bus.$off('removedTodo', (index) => this.remove(index));
      Bus.$off('finishedEdit', (data) => this.finishedEdit(data));
      Bus.$off('allChecked', (check) => this.checkAllTodos(check));
      Bus.$off('filterChanged', (filter) => this.filter = filter);
      Bus.$off('clearCompletedTodos', () => this.clearCompleted());
    },

    computed : {
      remaining() {
        return this.todos.filter(todo => ! todo.completed).length
      },
      anyRemaining() {
        return this.remaining !== 0;
      },
      todosFiltered() {
        if (this.filter === 'all') {
          return this.todos
        } else if (this.filter === 'active') {
          return this.todos.filter(todo => !todo.completed)
        } else if (this.filter === 'completed') {
          return this.todos.filter(todo => todo.completed)
        }
        return this.todos
      },
      showClearCompleted() {
        return this.todos.filter(todo => todo.completed).length > 0;
      }
    },

    methods : {
      addTodo() {
        if (this.newTodo.trim().length === 0) {
          return;
        }

        this.todos.push({
          id : this.todoId,
          title : this.newTodo,
          completed : false,
          editing : false
        });
        this.newTodo = '';
        this.todoId++;
      },
      remove(index) {
        this.todos.splice(index, 1);
      },
      // editTodo(todo) {
      //   this.cacheTitle = todo.title;
      //   todo.editing = true;
      // },
      // doneEdit(todo) {
      //   if (todo.title.trim() === '') {
      //     todo.title = this.cacheTitle
      //   }
      //   todo.editing = false;
      // },
      // cancelEdit(todo) {
      //   todo.title = this.cacheTitle;
      //   todo.editing = false;
      // },
      checkAllTodos() {
        this.todos.forEach((todo) => todo.completed = event.target.checked);
      },
      clearCompleted() {
        this.todos = this.todos.filter(todo => ! todo.completed);
      },
      finishedEdit(data) {
        this.todos.splice(data.index, 1, data.todo);
      }
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
