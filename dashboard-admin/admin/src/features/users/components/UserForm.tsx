import { Save, ArrowLeft, Edit, UserPlus } from 'lucide-react';

interface UserFormData {
  namaLengkap: string;
  email: string;
  password: string;
  role: string;
}

interface UserFormProps {
  isEditing: boolean;
  isLoading: boolean;
  formData: UserFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function UserForm({ isEditing, isLoading, formData, onChange, onSubmit, onBack }: UserFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isEditing ? <Edit size={20} className="text-[#1a1c2d]" /> : <UserPlus size={20} className="text-[#1a1c2d]" />}
          <h2 className="font-semibold text-gray-800">{isEditing ? 'Edit Data User' : 'Form Tambah User'}</h2>
        </div>
        <button onClick={onBack} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Kembali
        </button>
      </div>
      <form onSubmit={onSubmit} className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
          <input type="text" name="namaLengkap" required value={formData.namaLengkap} onChange={onChange} placeholder="Masukkan nama lengkap" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Akses</label>
          <input type="email" name="email" required value={formData.email} onChange={onChange} placeholder="email@bprkaranganyar.co.id" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {isEditing ? 'Password Baru (Kosongkan jika tidak ingin diubah)' : 'Password'}
          </label>
          <input type="password" name="password" required={!isEditing} value={formData.password} onChange={onChange} placeholder="Minimal 8 karakter" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Hak Akses (Role)</label>
          <select name="role" value={formData.role} onChange={onChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            <option value="Admin">Admin (Standar)</option>
            <option value="Super Administrator">Super Administrator</option>
            <option value="Viewer">Viewer (Hanya Lihat)</option>
          </select>
        </div>
        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-yellow-400 text-[#1a1c2d] px-6 py-2.5 rounded-xl font-semibold hover:bg-yellow-500 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
            {isLoading ? <span className="text-sm">Menyimpan...</span> : <><Save size={18} /><span className="text-sm">{isEditing ? 'Simpan Perubahan' : 'Simpan User Baru'}</span></>}
          </button>
        </div>
      </form>
    </div>
  );
}
