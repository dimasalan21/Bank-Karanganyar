import { useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

const INITIAL_USERS = [
  { id: 1, namaLengkap: 'Admin Sistem', email: 'admin@bprkaranganyar.co.id', role: 'Super Administrator' },
  { id: 2, namaLengkap: 'Budi Santoso', email: 'budi@bprkaranganyar.co.id', role: 'Admin' },
  { id: 3, namaLengkap: 'Siti Rahayu', email: 'siti@bprkaranganyar.co.id', role: 'Viewer' },
];

export default function UserList() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [view, setView] = useState<'table' | 'form'>('table');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    password: '',
    role: 'Admin',
  });

  const handleAddUser = () => {
    setEditingId(null);
    setFormData({ namaLengkap: '', email: '', password: '', role: 'Admin' });
    setView('form');
  };

  const handleEditUser = (user: any) => {
    setEditingId(user.id);
    setFormData({ namaLengkap: user.namaLengkap, email: user.email, password: '', role: user.role });
    setView('form');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
      alert(`Data user ${formData.namaLengkap} berhasil diperbarui!`);
    } else {
      const newUser = { id: Date.now(), namaLengkap: formData.namaLengkap, email: formData.email, role: formData.role };
      setUsers([...users, newUser]);
      alert(`User ${formData.namaLengkap} berhasil ditambahkan!`);
    }
    setIsLoading(false);
    setView('table');
  };

  return (
    <div className="p-4 md:p-6 bg-[#f4f7fb] min-h-screen">
      {view === 'table' ? (
        <UserTable users={users} onAdd={handleAddUser} onEdit={handleEditUser} />
      ) : (
        <UserForm
          isEditing={!!editingId}
          isLoading={isLoading}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onBack={() => setView('table')}
        />
      )}
    </div>
  );
}
