import { UserPlus, Edit, Users as UsersIcon } from 'lucide-react';

interface User {
  id: number;
  namaLengkap: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onAdd: () => void;
  onEdit: (user: User) => void;
}

export default function UserTable({ users, onAdd, onEdit }: UserTableProps) {
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

        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-yellow-400 text-[#1a1c2d] px-5 py-2.5 rounded-xl font-semibold hover:bg-yellow-500 transition-colors shadow-sm"
        >
          <UserPlus size={18} />
          <span>Tambah User</span>
        </button>
      </div>

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
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'Super Administrator'
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : user.role === 'Admin'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <button
                      onClick={() => onEdit(user)}
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
    </div>
  );
}
