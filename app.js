// updated
// Reference to the Firebase Realtime Database
const database = firebase.database();

// Add new todo
function addTodo() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  // Create a new unique key and save to Firebase
  const todoRef = database.ref("todos").push();
  const todo = {
    id: todoRef.key,
    text: task
  };

  todoRef.set(todo); // Save in database
  input.value = "";  // Clear input
}

// Display the todo on the web page
function renderTodo(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = task.text;
  span.setAttribute("data-id", task.id);

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.marginLeft = "10px";
  editBtn.onclick = function () {
    const newTask = prompt("Edit your task", span.textContent);
    if (newTask && newTask.trim() !== "") {
      database.ref("todos/" + task.id).update({ text: newTask.trim() });
      span.textContent = newTask.trim();
    }
  };

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "5px";
  deleteBtn.onclick = function () {
    database.ref("todos/" + task.id).remove();
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  document.getElementById("todoList").appendChild(li);
}

// Load todos from Firebase and show them
database.ref("todos").on("child_added", function (snapshot) {
  const task = snapshot.val();
  renderTodo(task);
});

// Remove deleted todos from UI
database.ref("todos").on("child_removed", function (snapshot) {
  const id = snapshot.key;
  const allItems = document.querySelectorAll("#todoList li");

  allItems.forEach((li) => {
    const span = li.querySelector("span");
    if (span.getAttribute("data-id") === id) {
      li.remove();
    }
  });
});

// Clear all todos (both UI and Firebase)
function clearAll() {
  database.ref("todos").remove(); // Delete all from Firebase
  document.getElementById("todoList").innerHTML = ""; // Clear UI
}

