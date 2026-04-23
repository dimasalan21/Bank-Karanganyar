import { useState } from 'react';
import { UserPlus, Save, Edit, ArrowLeft, Users as UsersIcon } from 'lucide-react';

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
    setFormData({
      namaLengkap: user.namaLengkap,
      email: user.email,
      password: '',
      role: user.role,
    });
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
      const newUser = {
        id: Date.now(),
        namaLengkap: formData.namaLengkap,
        email: formData.email,
        role: formData.role
      };
      setUsers([...users, newUser]);
      alert(`User ${formData.namaLengkap} berhasil ditambahkan!`);
    }

    setIsLoading(false);
    setView('table');
  };

  return (
    <div className="p-4 md:p-6 bg-[#f4f7fb] min-h-screen">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <UsersIcon size={24} className="text-gray-700" />
            Manajemen User
          </h1>
          <p className="text-gray-500 text-sm mt-1">Kelola data akses pengguna sistem admin.</p>
        </div>
        
        {view === 'table' && (
          <button
            onClick={handleAddUser}
            className="flex items-center justify-center gap-2 bg-yellow-400 text-[#1a1c2d] px-5 py-2.5 rounded-xl font-semibold hover:bg-yellow-500 transition-colors shadow-sm"
          >
            <UserPlus size={18} />
            <span>Tambah User</span>
          </button>
        )}
      </div>

      {view === 'table' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nama Lengkap</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Hak Akses</th>
                  <th className="px-6 py-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{user.namaLengkap}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'Super Administrator' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                        user.role === 'Admin' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 
                        'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Belum ada data user.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {editingId ? <Edit size={20} className="text-[#1a1c2d]" /> : <UserPlus size={20} className="text-[#1a1c2d]" />}
              <h2 className="font-semibold text-gray-800">
                {editingId ? 'Edit Data User' : 'Form Tambah User'}
              </h2>
            </div>
            
            <button 
              onClick={() => setView('table')}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} /> Kembali
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                name="namaLengkap"
                required
                value={formData.namaLengkap}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Akses</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="email@bprkaranganyar.co.id"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {editingId ? 'Password Baru (Kosongkan jika tidak ingin diubah)' : 'Password'}
              </label>
              <input
                type="password"
                name="password"
                required={!editingId}
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Hak Akses (Role)</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="Admin">Admin (Standar)</option>
                <option value="Super Administrator">Super Administrator</option>
                <option value="Viewer">Viewer (Hanya Lihat)</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-yellow-400 text-[#1a1c2d] px-6 py-2.5 rounded-xl font-semibold hover:bg-yellow-500 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="text-sm">Menyimpan...</span>
                ) : (
                  <>
                    <Save size={18} />
                    <span className="text-sm">{editingId ? 'Simpan Perubahan' : 'Simpan User Baru'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
