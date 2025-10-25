// 時計
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// タスク取得
fetch('/api/tasks')
  .then(res => res.json())
  .then(tasks => {
    const tbody = document.querySelector('#taskTable tbody');
    tbody.innerHTML = '';
    tasks.forEach(task => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${task.name}</td><td>${task.due}</td><td>${task.status}</td>`;
      tbody.appendChild(tr);
    });
  });
