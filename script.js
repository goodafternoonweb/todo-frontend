// ⚠️ Replace this with your actual Render backend URL
const API_URL = "https://your-backend.onrender.com";

function loadTasks() {
  fetch(`${API_URL}/tasks`)
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";
      tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.content;

        const btn = document.createElement("button");
        btn.textContent = "❌";
        btn.onclick = () => deleteTask(task.id, li);

        li.appendChild(btn);
        list.appendChild(li);
      });
    });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({content: text})
  })
  .then(res => res.json())
  .then(task => {
    const list = document.getElementById("taskList");

    const li = document.createElement("li");
    li.textContent = task.content;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteTask(task.id, li);

    li.appendChild(btn);
    list.appendChild(li);

    input.value = "";
  });
}

function deleteTask(id, li) {
  fetch(`${API_URL}/delete/${id}`, { method: "DELETE" })
    .then(() => li.remove());
}

window.onload = loadTasks;
