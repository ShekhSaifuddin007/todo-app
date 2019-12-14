export default {
  addTodo(context, todo) {
    setTimeout(() => {
      context.commit('addTodo', todo);
    }, 1000)
  },

  checkAll(context, checked) {
    setTimeout(() => {
      context.commit('checkAll', checked);
    }, 1000)
  },

  updateFilter(context, filter) {
    setTimeout(() => {
      context.commit('updateFilter', filter);
    }, 1000)
  },

  updateTodo(context, todo) {
    setTimeout(() => {
      context.commit('updateTodo', todo);
    }, 1000)
  },

  deleteTodo(context, id) {
    setTimeout(() => {
      context.commit('deleteTodo', id);
    }, 1000)
  },

  clearCompleted(context) {
    setTimeout(() => {
      context.commit('clearCompleted');
    }, 1000)
  }
}
