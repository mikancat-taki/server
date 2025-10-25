// 時計
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
}
setInterval(updateClock, 1000);
updateClock();

// メンバー取得
async function loadMembers() {
  const res = await fetch('/api/members');
  const members = await res.json();
  const tbody = document.querySelector('#memberTable tbody');
  tbody.innerHTML = '';
  const select = document.querySelector('#taskForm select[name="memberId"]');
  select.innerHTML = '';
  members.forEach(m => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${m.name}</td><td>${m.role}</td>`;
    tbody.appendChild(tr);
    select.innerHTML += `<option value="${m.id}">${m.name}</option>`;
  });
}
loadMembers();

// メンバー追加
document.getElementById('memberForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const form = e.target;
  await fetch('/api/members', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name: form.name.value, role: form.role.value})
  });
  form.reset();
  loadMembers();
});

// タスク取得
async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  const tbody = document.querySelector('#taskTable tbody');
  tbody.innerHTML = '';
  tasks.forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${t.name}</td>
                    <td>${new Date(t.due).toLocaleDateString()}</td>
                    <td>${t.status}</td>
                    <td>${t.member?.name || '-'}</td>`;
    tbody.appendChild(tr);
  });
  checkTaskNotifications(tasks);
}
loadTasks();

// タスク追加
document.getElementById('taskForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const form = e.target;
  await fetch('/api/tasks', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      name: form.name.value,
      due: form.due.value,
      memberId: parseInt(form.memberId.value)
    })
  });
  form.reset();
  loadTasks();
});

// タスク期限通知
function checkTaskNotifications(tasks){
  if(!("Notification" in window)) return;
  if(Notification.permission !== "granted") Notification.requestPermission();
  const now = new Date();
  tasks.forEach(t => {
    const due = new Date(t.due);
    if(!t.notified && due <= now) {
      new Notification(`タスク期限です: ${t.name}`);
      t.notified = true;
    }
  });
}
setInterval(async ()=>{ 
  const res = await fetch('/api/tasks'); 
  const tasks = await res.json();
  checkTaskNotifications(tasks);
}, 60000);
