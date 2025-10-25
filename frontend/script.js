// 時計
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// タスク取得
async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  const tbody = document.querySelector('#taskTable tbody');
  tbody.innerHTML = '';
  tasks.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${t.name}</td><td>${new Date(t.due).toLocaleDateString()}</td><td>${t.status}</td>`;
    tbody.appendChild(tr);
  });
}
loadTasks();

// タスク追加
document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const due = form.due.value;
  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, due })
  });
  form.reset();
  loadTasks();
});
