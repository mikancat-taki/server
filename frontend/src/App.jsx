import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import MemberList from './components/MemberList';
import axios from 'axios';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // タスク時間チェックして通知
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get('http://localhost:3000/api/tasks');
      const tasks = res.data;
      const now = new Date();
      tasks.forEach(task => {
        const taskTime = new Date(task.time);
        if (
          now.getHours() === taskTime.getHours() &&
          now.getMinutes() === taskTime.getMinutes() &&
          now.getSeconds() === taskTime.getSeconds()
        ) {
          notifyMember(task.member.name);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const notifyMember = (name) => {
    if (Notification.permission === 'granted') {
      new Notification(`Time to call ${name}!`);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') new Notification(`Time to call ${name}!`);
      });
    }
    // PC音再生
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Server App Dashboard</h1>
      <p className="mb-4 text-xl">Current Time: {time.toLocaleTimeString()}</p>
      <div className="flex gap-8">
        <TaskList />
        <MemberList />
      </div>
    </div>
  );
}

export default App;
