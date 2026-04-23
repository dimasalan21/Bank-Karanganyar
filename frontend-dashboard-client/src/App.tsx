import { RouterProvider } from 'react-router-dom';
import router from './app/routers';

export default function App() {
  return (
    // RouterProvider akan menyuntikkan semua konfigurasi dari routers.tsx ke aplikasi
    <RouterProvider router={router} />
  );
}