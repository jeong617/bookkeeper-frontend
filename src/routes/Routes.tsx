import { createBrowserRouter } from 'react-router-dom';

// project
import MainLayout from '../layout/MainLayout.tsx';
import Home from '../pages/Home.tsx';
import DashBoard from '../pages/DashBoard.tsx';
import ManageMembers from '../pages/ManageMembers.tsx';
import BookDetail from '../pages/book/BookDetail.tsx';
import { get } from '../api/api.ts';

const loadBookDetail = async ({ params }: any) => {
  const { novelId } = params; // URL 파라미터에서 novelId를 받음
  try {
    const res = await get({ url: `api/admin/novel/detail/${novelId}` });
    return { novelDetail: res.data }; // 데이터를 반환
  } catch (error) {
    throw new Error('Failed to load book details');
  }
};

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
        path: 'novel/:novelId',
        element: <BookDetail />,
        loader: loadBookDetail,
      }
    ]
  }
])

export default router;
