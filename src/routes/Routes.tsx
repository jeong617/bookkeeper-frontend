import { createBrowserRouter } from 'react-router-dom';

// project
import MainLayout from '../layout/MainLayout.tsx';
import Home from '../pages/Home.tsx';
import DashBoard from '../pages/DashBoard.tsx';
import ManageMembers from '../pages/ManageMembers.tsx';
import BookDetail from '../pages/book/BookDetail.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'members/',
        element: <ManageMembers />
      },
      {
        path: 'dashboard/',
        element: <DashBoard />
      },
      {
        path: '/book',
        element: <BookDetail title="데미안" coverImageUrl='/src/assets/book-cover/데미안.png' author='헤르만헤서' summary='줄거리~~' like={617} />
      }
    ]
  }
])

export default router;
