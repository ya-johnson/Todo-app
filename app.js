"use strict"

document.addEventListener('DOMContentLoaded', () => {

  const theme = document.querySelector('.theme-icon')
  const form = document.querySelector('.form')
  const input = document.querySelector('.input')
  const todoList = document.querySelector('.todo-list')
  const manage = document.querySelector('.manage')
  const count = document.querySelector('.m-count')
  const clear = document.querySelector('.m-clear')
  let todos = JSON.parse(localStorage.getItem('todos')) || []

  theme.addEventListener('click', () => {
    document.body.classList.toggle('light')
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const todoValue = input.value
    if (todoValue != '') {
      const todo = {
        id: new Date().getTime(),
        name: todoValue,
        isCompleted: false
      };
      
      todos.push(todo)
      localStorage.setItem('todos', JSON.stringify(todos))
      addTodo(todo)
      countTodos()
      manageBorder()

      input.value = ''
      input.placeholder = 'Create a new todo...'
      input.focus()
    }
  })

  todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const todoId = e.target.closest('li').id
      removeTodo(todoId)
      countTodos()
      manageBorder()
    }
  })

  todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('check')) {
      const todoEl = e.target.closest('li')
      checkTodo(todoEl)
    }
  })

  clear.addEventListener('click', () => {
    clearTodos()
    countTodos()
    manageBorder()
  })

  function addTodo(todo) {
    const todoEl = document.createElement('li')
    todoEl.id = todo.id
    todoEl.classList.add('todo-item')

    const todoElMarkup = `
    <div class="check"></div>
    <label class="todo-text">${todo.name}</label>
    <div class="delete"></div>`

    todoEl.innerHTML = todoElMarkup
    todoList.appendChild(todoEl)
  }

  function removeTodo(todoId) {
    todos = todos.filter((todo) => todo.id != todoId)
    localStorage.setItem('todos', JSON.stringify(todos))
    document.getElementById(todoId).remove()
  }

  function checkTodo(todoEl) {
    const todo = todos.find((todo) => todo.id == todoEl.id)

    if (todoEl.classList.contains('checked')) {
      todoEl.classList.remove('checked')
      todo.isCompleted = false
    } else {
      todoEl.classList.add('checked')
      todo.isCompleted = true
    }
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function countTodos() {
    count.textContent = `${todos.length} items left`
  }

  function clearTodos() {
    const cleared = todos.filter((todo) => todo.isCompleted == true)
    cleared.forEach((todo) => removeTodo(todo.id))
    todos = todos.filter((todo) => todo.isCompleted == false)
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function manageBorder() {
    if (todos.length > 0) {
      manage.classList.add('m-border')
    } else {
      manage.classList.remove('m-border')
    }
  }

  countTodos()

})


  