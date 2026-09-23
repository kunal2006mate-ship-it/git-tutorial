const addTodoBtn = document.getElementById("addTodoBtn");
const inputTag = document.getElementById("todoInput");
const todoListUl = document.getElementById("todoList");

let todoText;
let todos = [];

let todosString = localStorage.getItem("todos");

if (todosString) {
    todos = JSON.parse(todosString);
}

const populateTodos = () => {
    let string = "";

    for (const todo of todos) {
        string += `
        <li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}">
            <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
            <span class="todo-text">${todo.title}</span>
            <button class="delete-btn">×</button>
        </li>`;
    }

    todoListUl.innerHTML = string;

    // Checkbox Logic
    const todoCheckboxes = document.querySelectorAll(".todo-checkbox");

    todoCheckboxes.forEach((element) => {
        element.addEventListener("click", () => {

            if (element.checked) {
                element.parentNode.classList.add("completed");

                todos = todos.map((todo) => {
                    if (todo.id === element.parentNode.id) {
                        return { ...todo, isCompleted: true };
                    }
                    return todo;
                });

            } else {
                element.parentNode.classList.remove("completed");

                todos = todos.map((todo) => {
                    if (todo.id === element.parentNode.id) {
                        return { ...todo, isCompleted: false };
                    }
                    return todo;
                });
            }

            localStorage.setItem("todos", JSON.stringify(todos));
        });
    });

    // Delete Logic
    const deleteBtns = document.querySelectorAll(".delete-btn");

    deleteBtns.forEach((element) => {
        element.addEventListener("click", (e) => {

            const confirmation = confirm("Do you want to delete this todo?");

            if (confirmation) {
                todos = todos.filter((todo) => {
                    return todo.id !== e.target.parentNode.id;
                });

                localStorage.setItem("todos", JSON.stringify(todos));
                populateTodos();
            }
        });
    });
};

// Add Todo
addTodoBtn.addEventListener("click", () => {

    todoText = inputTag.value.trim();

    if (todoText.length < 4) {
        alert("You cannot add a todo that small!");
        return;
    }

    inputTag.value = "";

    let todo = {
        id: "todo-" + Date.now(),
        title: todoText,
        isCompleted: false
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    populateTodos();
});

populateTodos();