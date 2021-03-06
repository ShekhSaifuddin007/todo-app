export default {
  retrieveTodos(state, todos) {
    state.todos = todos;
  },
  addTodo(state, todo) {
    state.todos.push({
      id : todo.id,
      title : todo.title,
      completed : false,
      editing : false
    });
  },

  checkAll(state, checked) {
    state.todos.forEach((todo) => todo.completed = checked);
  },

  updateFilter(state, filter) {
    state.filter = filter;
  },

  updateTodo(state, todo) {
    const index = state.todos.findIndex((item) => item.id === todo.id)
    state.todos.splice(index, 1, {
      id : todo.id,
      title : todo.title,
      completed : todo.completed,
      editing : todo.editing,
      cacheTitle : '',
    });
  },

  deleteTodo(state, id) {
    const index = state.todos.findIndex((item) => item.id === id)
    state.todos.splice(index, 1);
  },

  clearCompleted(state) {
    state.todos = state.todos.filter(todo => ! todo.completed);
  }
}
