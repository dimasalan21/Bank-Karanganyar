import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PermintaanPaginationProps {
  currentPage: number;
  totalPages: number;
  totalData: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function PermintaanPagination({
  currentPage,
  totalPages,
  totalData,
  pageSize,
  onPageChange,
}: PermintaanPaginationProps) {
  return (
    <div className="flex justify-between items-center mt-5">
      <p className="text-sm text-gray-500">
        Menampilkan {totalData === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
        {Math.min(currentPage * pageSize, totalData)} dari {totalData} data
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
              n === currentPage
                ? 'bg-yellow-400 text-black shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
