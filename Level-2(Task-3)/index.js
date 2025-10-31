let pendingContainer = document.getElementById("pendingTasksContainer");
let completedContainer = document.getElementById("completedTasksContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  return parsedTodoList === null ? [] : parsedTodoList;
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  alert("Tasks saved successfully!");
};

function onAddTodo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value.trim();

  if (userInputValue === "") {
    alert("Enter a valid task");
    return;
  }

  todosCount += 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null,
  };

  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

addTodoButton.onclick = onAddTodo;

function onTodoStatusChange(todoId) {
  let todoIndex = todoList.findIndex(todo => "todo" + todo.uniqueNo === todoId);
  let todo = todoList[todoIndex];

  todo.isChecked = !todo.isChecked;
  todo.completedAt = todo.isChecked ? new Date().toLocaleString() : null;

  renderAllTodos();
}

function onDeleteTodo(todoId) {
  todoList = todoList.filter(todo => "todo" + todo.uniqueNo !== todoId);
  renderAllTodos();
}

function onEditTodo(todoId) {
  let todo = todoList.find(t => "todo" + t.uniqueNo === todoId);
  let newText = prompt("Edit task:", todo.text);
  if (newText !== null && newText.trim() !== "") {
    todo.text = newText.trim();
    renderAllTodos();
  }
}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row", "align-items-center", "justify-content-between", "flex-wrap");
  todoElement.id = todoId;

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;
  inputElement.onclick = () => onTodoStatusChange(todoId);
  inputElement.classList.add("checkbox-input");

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label", "mt-2", "mt-sm-0");
  labelElement.textContent = `${todo.text}`;

  let timeEle = document.createElement("span");
  timeEle.classList.add("span-label", "mt-2", "mt-sm-0");
  timeEle.textContent = `(${todo.isChecked ? "Completed on: " + todo.completedAt : "Added on: " + todo.createdAt})`;
  labelElement.appendChild(timeEle);

  let actionsDiv = document.createElement("div");
  actionsDiv.classList.add("delete-icon-container", "d-flex", "align-items-center");

  let editIcon = document.createElement("i");
  editIcon.classList.add("far", "fa-edit", "delete-icon", "mr-2");
  editIcon.onclick = () => onEditTodo(todoId);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = () => onDeleteTodo(todoId);

  actionsDiv.appendChild(editIcon);
  actionsDiv.appendChild(deleteIcon);

  todoElement.appendChild(inputElement);
  todoElement.appendChild(labelElement);
  todoElement.appendChild(actionsDiv);

  if (todo.isChecked) {
    completedContainer.appendChild(todoElement);
  } else {
    pendingContainer.appendChild(todoElement);
  }
}

function renderAllTodos() {
  pendingContainer.innerHTML = "";
  completedContainer.innerHTML = "";
  todoList.forEach(createAndAppendTodo);
}

renderAllTodos();
