let task = document.getElementById("task");
let darkmode = document.getElementById("darkmode");
let add = document.getElementById("add");
let display = document.getElementById("display");
let all = document.getElementById("all");
let active = document.getElementById("active");
let complete = document.getElementById("complete");
let pend = document.getElementById("pending");
let currentFilter = "all";
let savedMode = localStorage.getItem("mode");
if (savedMode === "dark") {
    document.body.classList.add("darkmode");
    darkmode.textContent = "☀️";
}
let tasks = [];
let savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}
all.addEventListener("click", function () {
    currentFilter = "all";
    renderTasks();
});
active.addEventListener("click", function () {
    currentFilter = "active";
    renderTasks();
});
complete.addEventListener("click", function () {
    currentFilter = "complete";
    renderTasks();
});
add.addEventListener("click", function () {
    let taskText = task.value.trim();
    if (!(taskText)) {
        alert("please enter a task")
        return;
    }
    let taskObject = {
        text: taskText,
        completed: false
    };
    tasks.push(taskObject);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    task.value = "";
});
function renderTasks() {
    display.innerHTML = "";
    let incomplete = 0;
    tasks.forEach(function (taskObject) {
        if (!(taskObject.completed)) {
            incomplete++;
        }
        if (currentFilter === "active" && taskObject.completed) {
            return;
        }
        else if (currentFilter === "complete" && !(taskObject.completed)) {
            return;
        }
        let taskElement = document.createElement("p");
        let checkbox = document.createElement("input");
        let delbutton = document.createElement("button");
        taskElement.classList.add("task-item");

        taskElement.textContent = taskObject.text;
        taskElement.style.fontSize = "18px";

        checkbox.type = "checkbox";
        checkbox.checked = taskObject.completed;
        checkbox.style.width = "18px";
        checkbox.style.height = "18px";
        checkbox.addEventListener("change", function () {
            taskObject.completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        delbutton.textContent = "Delete";
        delbutton.addEventListener("click", function () {
            let index = tasks.indexOf(taskObject);
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        taskElement.prepend(checkbox);
        taskElement.appendChild(delbutton);
        display.appendChild(taskElement);
    });
    if (incomplete === 1) {
        pend.textContent = `${incomplete} task remaining`;
    }
    else {
        pend.textContent = `${incomplete} tasks remaining`;
    }

}
renderTasks();
darkmode.addEventListener("click", function () {
    document.body.classList.toggle("darkmode");
    if (document.body.classList.contains("darkmode")) {
        darkmode.textContent = "☀️";
        localStorage.setItem("mode", "dark");
    }
    else {
        darkmode.textContent = "🌙";
        localStorage.setItem("mode", "light");
    }
});