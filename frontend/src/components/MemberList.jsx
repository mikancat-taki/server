import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');

  const fetchMembers = async () => {
    const res = await axios.get('http://localhost:3000/api/members');
    setMembers(res.data);
  };

  useEffect(() => { fetchMembers(); }, []);

  const addMember = async () => {
    if (!name) return;
    await axios.post('http://localhost:3000/api/members', { name });
    setName('');
    fetchMembers();
  };

  const deleteMember = async (id) => {
    await axios.delete(`http://localhost:3000/api/members/${id}`);
    fetchMembers();
  };

  return (
    <div className="w-1/2">
      <h2 className="text-2xl mb-2">Members</h2>
      <div className="mb-4 flex gap-2">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-1"/>
        <button onClick={addMember} className="bg-green-500 text-white px-2">Add</button>
      </div>
      <ul>
        {members.map(member => (
          <li key={member.id} className="mb-1 flex justify-between">
            {member.name}
            <button onClick={() => deleteMember(member.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
