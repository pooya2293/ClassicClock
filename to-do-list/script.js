// selectors:
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");
// event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", editRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);
// functions
function addTodo(event) {
  event.preventDefault();
  // create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create todo item
  const newTodo = `
  <li class="todo-item">${todoInput.value}</li>
  <span> <i class="far fa-check-square"></i></span>
  <span><i class="far fa-edit"></i></span>
  <span><i class="far fa-trash-alt"></i></span>`;
  todoDiv.innerHTML = newTodo;
  // append to todolist
  todoList.appendChild(todoDiv);
  // save todo in local ;
  saveLocalTodos(todoInput.value);
  // clear input :
  todoInput.value = "";
}

function editRemove(event) {
  const classList = [...event.target.classList];
  const item = event.target;

  if (classList[1] === "fa-trash-alt") {
    // console.log(item.parentElement.parentElement);
    const todo = item.parentElement.parentElement;
    todo.remove();
    removeLocalTodos(todo);
  } else if (classList[1] === "fa-check-square") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodos(event) {
  const todos = [...todoList.childNodes];
  // console.log(todos);
  console.log(event.target.value);
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });

  // console.log(event.target.value);
}

function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  savedTodos.forEach((todo) => {
    // create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create todo item
    const newTodo = `<li class="todo-item">${todo}</li>
    <span> <i class="far fa-check-square"></i></span>
    <span><i class="far fa-edit"></i></span>
    <span><i class="far fa-trash-alt"></i></span>`;
    todoDiv.innerHTML = newTodo;
    // append to todolist
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // console.log(todo.children[0].innerText);
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredTodos = savedTodos.filter(
    (t) => t !== todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}
