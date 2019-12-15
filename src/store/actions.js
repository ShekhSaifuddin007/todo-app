export default {
  retrieveTodos(context) {
    context.state.loading = true;
    dbCollection.orderBy('timestamp', 'asc').get()
      .then(querySnapshot => {
        let tempTodos = [];
        querySnapshot.forEach(document => {
          //console.log(document.data());
          const data = {
            id : document.id,
            title : document.data().title,
            completed : document.data().completed,
            timestamp : document.data().timestamp,
          };
          tempTodos.push(data);
        });
        context.state.loading = false;
        // const asc = tempTodos.sort((a, b) => {
        //   return a.timestamp.seconds - b.timestamp.seconds
        // });
        context.commit('retrieveTodos', tempTodos);
      });


    // axios
    //   .get('/todos')
    //   .then(res => {
    //     context.commit('retrieveTodos', res.data.data)
    //   }).catch(err => {
    //   console.log(err)
    // })
  },
  addTodo(context, todo) {
    context.state.loading = true;
    //with firebase
    dbCollection.add({
      title : todo.title,
      completed : false,
      timestamp : new Date(),
    }).then(document => {
      context.commit('addTodo', {
        id : document.id,
        title : todo.title,
        completed : false,
      });
      context.state.loading = false;
    })

    // axios
    //   .post('/todos', {
    //     title : todo.title,
    //     completed : false,
    //   })
    //   .then(res => {
    //     context.commit('addTodo', res.data.data)
    //   }).catch(err => {
    //   console.log(err)
    // });
    // context.commit('addTodo', todo)
  },

  updateTodo(context, todo) {
    dbCollection.doc(todo.id).set({
      //id : todo.id,
      title : todo.title,
      completed : todo.completed,
      //timestamp : new Date(),
    }, { merge: true }).then(() => {
      context.commit('updateTodo', todo)
    });

    // axios
    //   .patch('/todos/' + todo.id, {
    //     title : todo.title,
    //     completed : todo.completed,
    //   })
    //   .then(res => {
    //     context.commit('updateTodo', res.data.data)
    //   }).catch(err => {
    //   console.log(err)
    // });
    // context.commit('updateTodo', todo)
  },

  deleteTodo(context, id) {
    dbCollection.doc(id).delete()
      .then(() => {
        context.commit('deleteTodo', id)
      })

    // axios
    //   .delete('/todos/' + id)
    //   .then(res => {
    //     context.commit('deleteTodo', id)
    //   }).catch(err => {
    //   console.log(err)
    // });
    // context.commit('deleteTodo', id)
  },

  checkAll(context, checked) {
    dbCollection.get().then(querySnapshot => {
      querySnapshot.forEach(document => {
        document.ref.update({
          completed : checked,
        }).then(() => {
          context.commit('checkAll', checked);
        })
      })
    })

    // axios
    //   .patch('/check-all', {
    //     completed : checked
    //   })
    //   .then(res => {
    //     context.commit('checkAll', checked)
    //   }).catch(err => {
    //   console.log(err)
    // });
    // context.commit('checkAll', checked)
  },

  updateFilter(context, filter) {
      context.commit('updateFilter', filter);
  },

  clearCompleted(context) {
    dbCollection.where('completed', '==', true).get()
      .then(querySnapshot => {
        querySnapshot.forEach(document => {
          document.ref.delete().then(() => {
            context.commit('clearCompleted');
          })
        })
      })

    // const completed = context.state.todos.filter((todo) => todo.completed).map((todo) => todo.id);
    // axios
    //   .delete('/delete-all-checked', {
    //     data : {
    //       todos : completed,
    //     }
    //   })
    //   .then(res => {
    //     context.commit('clearCompleted');
    //   }).catch(err => {
    //   console.log(err)
    // });
    // context.commit('clearCompleted');
  }
}
