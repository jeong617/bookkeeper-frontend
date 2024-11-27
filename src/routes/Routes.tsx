import { createBrowserRouter } from 'react-router-dom';
import {AxiosResponse} from "axios";

// project
// TODO: lazy loading 적용 페이지 선정 및 로딩 UI 추가
import MainLayout from '../layout/MainLayout.tsx';
import Home from '../pages/Home.tsx';
import DashBoard from '../pages/DashBoard.tsx';
import ManageMembers from '../pages/ManageMembers.tsx';
import BookDetail from '../pages/book/BookDetail.tsx';
import { get } from '../api/api.ts';
import Login from '../pages/Login.tsx';
import Register from '../pages/Register.tsx';

const loadBookDetail = async ({ params }: any) => {
  const { novelId } = params;
  try {
    const res: AxiosResponse = await get({ url: `api/admin/novels/${novelId}` });
    return { novelDetail: res.data };
  } catch {
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
      },
      {
        path: 'login/',
        element: <Login />
      },
      {
        path: 'register/',
        element: <Register />
      }
    ]
  },
])

export default router;
