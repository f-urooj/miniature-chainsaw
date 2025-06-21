function addTodo() {
      var input = document.getElementById("todoInput");
      var task = input.value;

      if (task === "") {
        alert("Please enter a task");
        return;
      }

      var li = document.createElement("li");
      var span = document.createElement("span");
      span.textContent = task;

      // for Edit button
      var editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = function() {
        var newTask = prompt("Edit your task", span.textContent);
        if (newTask) {
          span.textContent = newTask;
        }
      };

      // for Delete button
      var deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = function() {
        li.remove();
      };

      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      document.getElementById("todoList").appendChild(li);
      input.value = "";
    }

function clearAll(){
      document.getElementById("todoList").innerHTML = "";
}