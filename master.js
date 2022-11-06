const input = document.querySelector(".text");
const submit = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const number = document.querySelector(".task-number");
let arrayOfTask = [];

// check for localStorage if it has data or not
if (window.localStorage.getItem("tasks")) {
  let data = JSON.parse(window.localStorage.getItem("tasks"));
  if (data) {
    arrayOfTask = data;
    addToPage(arrayOfTask);
  }
}

// when click submit add task
submit.addEventListener("click", () => {
  if (input.value != 0) {
    addTask(input.value);
    input.value = " ";
  }
});

// on click remove task

document.querySelectorAll(".remove").forEach((remove) => {
  remove.addEventListener("click", () => {
    remove.parentElement.remove();
    removeElement(remove.parentElement);
  });
});

// on click done task
document.querySelectorAll(".task").forEach((task) => {
  task.addEventListener("click", () => {
    task.classList.toggle("done");
    doneIt(task.id);
  });
});

// add task when you press enter
window.addEventListener("keydown", () => {
  if (event.key === "Enter") {
    if (input.value != 0) {
      addTask(input.value);
      input.value = " ";
    }
  }
});

// creat info of task
function addTask(text) {
  let task = {
    id: Date.now(),
    complated: "false",
    title: text,
  };
  arrayOfTask.push(task);
  addToPage(arrayOfTask);
}

// add data into page

function addToPage(thearray) {
  tasks.innerHTML = "";
  thearray.forEach((task) => {
    // make li
    const li = document.createElement("li");
    li.className = "task";
    if (task.complated === true) {
      li.className = "task done";
    }
    li.appendChild(document.createTextNode(task.title));
    li.setAttribute("id", task.id);
    li.setAttribute("data-complated", task.complated);
    // make remove btn
    const remove = document.createElement("span");
    remove.className = "remove";
    remove.appendChild(document.createTextNode("Remove"));
    li.appendChild(remove);
    tasks.appendChild(li);
    addLocal(arrayOfTask);
    // make counter of tasks
    number.innerHTML = arrayOfTask.length;
  });
}

// put the data into localStorage

function addLocal(array) {
  window.localStorage.setItem("tasks", JSON.stringify(array));
}

// for remove the task
function removeElement(element) {
  arrayOfTask.forEach((task) => {
    arrayOfTask = arrayOfTask.filter((task) => task.id != element.id);
    // put data into localStorage
    addLocal(arrayOfTask);
    number.innerHTML = arrayOfTask.length;
  });
}
// for done the task

function doneIt(idOfTask) {
  arrayOfTask.forEach((task) => {
    if (task.id == idOfTask) {
      task.complated == false ? (task.complated = true) : (task.complated = false);
    }
    // put data into localStorage
    addLocal(arrayOfTask);
    number.innerHTML = arrayOfTask.length;
  });
}
