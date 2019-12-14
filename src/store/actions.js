export default {
  retrieveTodos(context) {
    axios
      .get('/todos')
      .then(res => {
        context.commit('retrieveTodos', res.data.data)
      }).catch(err => {
      console.log(err)
    })
  },
  addTodo(context, todo) {
    axios
      .post('/todos', {
        title : todo.title,
        completed : false,
      })
      .then(res => {
        context.commit('addTodo', res.data.data)
      }).catch(err => {
      console.log(err)
    });
  },

  updateTodo(context, todo) {
    axios
      .patch('/todos/' + todo.id, {
        title : todo.title,
        completed : todo.completed,
      })
      .then(res => {
        context.commit('updateTodo', res.data.data)
      }).catch(err => {
      console.log(err)
    });
  },

  deleteTodo(context, id) {
    axios
      .delete('/todos/' + id)
      .then(res => {
        context.commit('deleteTodo', id)
      }).catch(err => {
      console.log(err)
    });
  },

  checkAll(context, checked) {
    axios
      .patch('/check-all', {
        completed : checked
      })
      .then(res => {
        context.commit('checkAll', checked)
      }).catch(err => {
      console.log(err)
    });
  },

  updateFilter(context, filter) {
      context.commit('updateFilter', filter);
  },

  clearCompleted(context) {
    const completed = context.state.todos.filter((todo) => todo.completed).map((todo) => todo.id);
    axios
      .delete('/delete-all-checked', {
        data : {
          todos : completed,
        }
      })
      .then(res => {
        context.commit('clearCompleted');
      }).catch(err => {
      console.log(err)
    });
  }
}
