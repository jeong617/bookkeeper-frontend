import { createBrowserRouter } from 'react-router-dom';
import {AxiosResponse} from "axios";

// project
// TODO: lazy loading 적용 페이지 선정 및 로딩 UI 추가
import MainLayout from '../layout/MainLayout.tsx';
import Home from '../pages/Home.tsx';
import DashBoard from '../pages/DashBoard.tsx';
import ManageMembers from '../pages/ManageMembers.tsx';
import BookDetail from '../pages/BookDetail.tsx';
import { get } from '../api/api.ts';
import AuthSkeleton from '../pages/auth/AuthSkeleton.tsx';
import FileUploadMonitor from '../pages/FileUploadMonitor.tsx';
import PushNotification from '../pages/PushNotification.tsx';
import SearchResult from '../pages/SearchResult.tsx';
import Feedback from '../pages/Feedback.tsx';
import NovelRequest from '../pages/NovelRequest.tsx';
import {getNovelList} from '../api/functional/novel/list';

const loadBookDetail = async ({ params }: any) => {
  const { novelId } = params;
  try {
    const res: AxiosResponse = await get({ url: `api/admin/novels/${novelId}` });
    return { novelDetail: res.data };
  } catch {
    throw new Error('Failed to load book details');
  }
};

const loadReqNovels = async () => {
  try {
    const res: void = await getNovelList(
      {host: import.meta.env.VITE_API_URL_COMMUNITY},
      {page: 1, orderBy: 'desc'}
    )
    return { reqNovels: res }
  } catch {
    throw new Error('Failed to load request novels');
  }
}

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
        path: '/search',
        element: <SearchResult />
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
        path: 'upload-monitor/',
        element: <FileUploadMonitor />
      },
      {
        path: 'notification/',
        element: <PushNotification />,
      },
      {
        path: 'novel/:novelId',
        element: <BookDetail />,
        loader: loadBookDetail,
      },
      {
        path: 'auth/',
        element: <AuthSkeleton />,
      },
      {
        path: 'feedback/',
        element: <Feedback />
      },
      {
        path: 'novel-request/',
        element: <NovelRequest />,
        loader: loadReqNovels,
      }
    ]
  },
])

export default router;
