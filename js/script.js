"use strict";

let elTodoForm = document.querySelector(".todo__form");
let elTodoInput = document.querySelector(".todo__input");
let elTodoList = document.querySelector(".todo__list");
let elAllTodoNumb = document.querySelector(".span__all");
let elCampTodoNumb = document.querySelector(".span__comp");
let elUnampTodoNumb = document.querySelector(".span__uncomp");
let elBtnAll = document.querySelector(".btn__all");
let elBtnComp = document.querySelector(".btn__comp");
let elBtnUncomp = document.querySelector(".btn__uncomp");

let todos = [];
let num = 0;

elBtnAll.addEventListener("click", function() {
  elTodoList.innerHTML = null;

  renderTodos(todos, elTodoList);

  elAllTodoNumb.textContent = todos.length
})

elBtnComp.addEventListener("click", function() {
 let todoComplate =  todos.filter(function(todo) {
    return todo.isCompleted === true
  })

  elCampTodoNumb.textContent = Number(todoComplate.length)

  elTodoList.innerHTML = null;

  renderTodos(todoComplate, elTodoList);

})

elBtnUncomp.addEventListener("click", function() {
  let todoUncomplate =  todos.filter(function(todo) {
     return todo.isCompleted === false
   })
   
   elUncampTodoNumb.textContent = Number(todoComplate.length)

   renderTodos(todoUncomplate, elTodoList);

 })

elTodoList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-btn")) {
    let btnTodoId = Number(evt.target.dataset.todoId);
    const foundTodoIndex = todos.findIndex((todo) => todo.id === btnTodoId);

    todos.splice(foundTodoIndex, 1);

    elTodoList.innerHTML = null;

    renderTodos(todos, elTodoList);
  } else if (evt.target.matches(".checkbox-btn")) {
    let checkTodoId = Number(evt.target.dataset.todoId);
    let foundCheckTodo = todos.find((todo) => todo.id === checkTodoId);

    foundCheckTodo.isCompleted = !foundCheckTodo.isCompleted;

    elTodoList.innerHTML = null;

    renderTodos(todos, elTodoList);
  }
});

let renderTodos = function (arr, element) {
  arr.forEach(function (todo) {
    let newItem = document.createElement("li");
    let newAlertText = document.createElement("p");
    let newAlertWrap = document.createElement("div");
    let newCheckbox = document.createElement("input");
    let newDeleteBtn = document.createElement("button");
    let newAlertElemWrap = document.createElement("div");

    newCheckbox.type = "checkbox";

    newAlertText.textContent = todo.title;
    newDeleteBtn.textContent = "🗑️";

    newDeleteBtn.dataset.todoId = todo.id;
    newCheckbox.dataset.todoId = todo.id;

    newAlertWrap.setAttribute("class", "alert alert-primary form__alert");
    newAlertWrap.setAttribute("role", "alert");
    newCheckbox.setAttribute("class", "form-check-input form__lisrt-input checkbox-btn");
    newDeleteBtn.setAttribute("class", "btn btn-outline-primary delete-btn");
    newAlertText.setAttribute("class", "alert__text");
    newAlertElemWrap.setAttribute("class", "alert-elemet__wrap");

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newAlertText.style.textDecoration = "line-through";
    }

    element.appendChild(newItem);
    newItem.appendChild(newAlertWrap);
    newAlertWrap.appendChild(newCheckbox);
    newAlertWrap.appendChild(newAlertElemWrap);
    newAlertElemWrap.appendChild(newDeleteBtn);
    newAlertElemWrap.appendChild(newAlertText);
  });
};

elTodoForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let inputValue = elTodoInput.value;

  let newTodo = {
    id: num++,
    title: inputValue,
    isCompleted: false,
  };

  todos.push(newTodo);

  elTodoInput.value = null;
  elTodoList.innerHTML = null;

  renderTodos(todos, elTodoList);
});
