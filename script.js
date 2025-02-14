// Login validation
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    function validateUser(callback) {
        if (username === "admin" && password === "12345") {
            callback(true);
        } else {
            callback(false);
        }
    }

    validateUser(function (isValid) {
        if (isValid) {
            window.location.href = "todo.html"; 
        } else {
            errorMessage.textContent = "Invalid username or password!";
        }
    });
}

// Logout function
function logout() {
    window.location.href = "index.html"; 
}

// Fetch To-Do list 
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("todo.html")) {
        fetchTodos();
    }
});

let completedCount = 0;

function fetchTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response => response.json())
        .then(todos => displayTodos(todos.slice(0, 6))) 
        .catch(error => console.error("Error fetching data:", error));
}

function displayTodos(todos) {
    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""; 

    todos.forEach(todo => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-2";
        checkbox.checked = todo.completed;
        checkbox.disabled = todo.completed;
        if (!todo.completed) {
            checkbox.addEventListener("change", () => markComplete(checkbox));
        }

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(todo.title));
        todoList.appendChild(li);
    });
}

// Mark tasks as completed 
function markComplete(checkbox) {
    return new Promise((resolve) => {
        if (checkbox.checked) {
            completedCount++;
            if (completedCount === 5) {
                alert("Congrats! 5 Tasks have been Successfully Completed.");
            }
        }
        resolve();
    });
}
