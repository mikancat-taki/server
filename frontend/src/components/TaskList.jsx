import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [memberId, setMemberId] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!title || !time || !memberId) return;
    await axios.post('http://localhost:3000/api/tasks', { title, time, memberId: parseInt(memberId) });
    setTitle(''); setTime(''); setMemberId('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="w-1/2">
      <h2 className="text-2xl mb-2">Tasks</h2>
      <div className="mb-4 flex gap-2">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-1"/>
        <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} className="border p-1"/>
        <input placeholder="Member ID" value={memberId} onChange={e => setMemberId(e.target.value)} className="border p-1"/>
        <button onClick={addTask} className="bg-blue-500 text-white px-2">Add</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-1 flex justify-between">
            {task.title} ({task.member.name}) @ {new Date(task.time).toLocaleString()}
            <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
