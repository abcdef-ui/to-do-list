// app.js 
document.addEventListener('DOMContentLoaded', function() {
  const todoInput = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');

  function fetchTodos() {
    fetch('/todos')
      .then(response => response.json())
      .then(data => {
        todoList.innerHTML = '';
        data.forEach((todo, index) => {
          const li = document.createElement('li');
          li.className = todo.completed ? 'completed' : '';
          li.textContent = todo.task;

          const toggleBtn = document.createElement('button');
          toggleBtn.textContent = todo.completed ? 'Undo' : 'Done';
          toggleBtn.addEventListener('click', () => toggleTodo(index));

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', () => deleteTodo(index));

          li.appendChild(toggleBtn);
          li.appendChild(deleteBtn);
          todoList.appendChild(li);
        });
      });
  }

  function addTodo() {
    const todo = todoInput.value.trim();
    if (todo) {
      fetch('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo: todo })
      })
      .then(response => response.json())
      .then(fetchTodos);
      todoInput.value = '';
    }
  }

  function toggleTodo(index) {
    fetch(`/todos/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(fetchTodos);
  }

  function deleteTodo(index) {
    fetch(`/todos/${index}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(fetchTodos);
  }

  addBtn.addEventListener('click', addTodo);
  fetchTodos();
});