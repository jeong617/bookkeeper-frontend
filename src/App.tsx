import { createRoot } from 'react-dom/client'
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes.tsx';

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
);
