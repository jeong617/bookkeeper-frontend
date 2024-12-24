import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

// project
import { get, del } from '../../api/api.ts';
import { Header } from '../../components/header';
import FormButton from '../../components/FormButton.tsx';
import EpisodeListItem from '../../components/EpisodeListItem.tsx';
import CommentItem from '../../components/CommentItem.tsx';
import { BookDetailTabType } from '../../store/types.tsx';
import { NovelDetailData, EpisodeData, CommentData } from '../../store/novelDetailInterface.ts';
import parseDateTime from '../../utils/parseDateTime.ts';
import UpdateEpisode from '../form/UpdateEpisode.tsx';

// css
import { FaPen, FaHeart, FaTrashAlt, FaPlus } from 'react-icons/fa';
import PopUp from '../form/PopUp.tsx';
import UploadEpisode from '../form/UploadEpisode.tsx';

function BookDetail(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<BookDetailTabType>(BookDetailTabType.Episodes);
  const [popWarning, setPopWarning] = useState<boolean>(false);
  const [isEpisodeUploadModalOpened, setEpisodeUploadModalOpened] = useState<boolean>(false);
  const [isEpisodeDetailModalOpened, setEpisodeDetailModalOpened] = useState<boolean>(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);
  const [episodeList, setEpisodeList] = useState<EpisodeData[]>([]);
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const navigate = useNavigate();
  const { novelId } = useParams<{ novelId: string }>();
  const { novelDetail } = useLoaderData() as { novelDetail: NovelDetailData };

  // etc.
  let defaultImage = '/book-cover/default-book-cover.jpg';
  if (novelDetail.title === '동백꽃1') {
    defaultImage = '/book-cover/flower.jpeg';
  }


  // handler
  const openEpisodeUploadModal = () => setEpisodeUploadModalOpened(true);
  const closeEpisodeUploadModal = () => setEpisodeUploadModalOpened(false);
  const handleUpdateEpisode = (episodeId: string) => {
    setEpisodeDetailModalOpened(true);
    setSelectedEpisodeId(episodeId);
  };

  // episodeList api
  const getEpisodeList = async () => {
    try {
      const res: AxiosResponse = await get({
        url: `api/admin/novels/${novelId}/episodes`,
      });
      setEpisodeList(res.data.episodeList);
    } catch (error) {
      console.error('소설 목록을 가져오는 데 실패했습니다.', error);
    }
  };

  // delete novel api
  const deleteNovel = async () => {
    const url = `api/admin/novels/${novelId}`;
    try {
      await del({ url: url });
      setPopWarning(false);
      navigate('/');
    } catch (error) {
      alert('소설 삭제 실패');
    }
  };

  // delete episode api
  const deleteEpisode = async (episodeId: string) => {
    const url = `api/admin/episode/${episodeId}`;
    try {
      await del({ url: url });
      alert('에피소드 삭제 완료!');
      getEpisodeList();
    } catch (error) {
      alert('에피소드 삭제 실패');
    }
  };

  useEffect(() => {
    getEpisodeList();
  }, [novelId, isEpisodeUploadModalOpened]);

  // commentList api
  useEffect(() => {
    if (activeTab === BookDetailTabType.Comments) {
      const getCommentList = async () => {
        try {
          const res: AxiosResponse = await get({
            url: `api/admin/novels/${novelId}/comments`,
          });
          setCommentList(res.data.commentList);
        } catch (error) {
          console.error('댓글 목록을 가져오는 데 실패했습니다.', error);
        }
      };
      getCommentList();
    }
  }, [activeTab, novelId]);
  return (
    <>
      <Header />
      <div className='container px-48 mx-auto mt-12'>
        {/* 도서 기본 정보 */}
        <div className='flex flex-row gap-5 p-1'>
          <img
            alt='book-cover-image'
            src={novelDetail.coverImageUrl}
            className='w-48 h-64 rounded-normal-radius shadow-md'
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = defaultImage;
            }}
          />
          <div className='flex flex-col w-full items-start justify-between py-2'>
            <div
              id='basic-section'
              className='flex flex-row w-full items-center justify-between'
            >
              <div id='basic-info' className='flex flex-col'>
                <span className='text-3xl font-extrabold'>{novelDetail.title}</span>
                <span className='font-medium'>{novelDetail.authorList.join(', ')}</span>
              </div>
              <div
                id='form-button'
                className='flex flex-row gap-5 px-2 items-center'
              >
                <FormButton
                  label='수정'
                  icon={<FaPen size={13} className='fill-button-text' />}
                />
                <button
                  onClick={() => setPopWarning(true)}
                ><FaTrashAlt size={25} className='fill-red-500 hover:fill-red-700' />
                </button>
                {popWarning && (
                  <PopUp isOpened={popWarning} onClick={deleteNovel} onClose={() => setPopWarning(false)} />
                )}
              </div>
            </div>
            <span className='text-sm text-start'>{novelDetail.summary}</span>
            <div id='like-number' className='flex justify-start gap-1'>
              <FaHeart fill='red' />
              <span className='text-xs'>{novelDetail.likes}</span>
            </div>
          </div>
        </div>

        <div className='bg-gray-50 w-full mt-12 rounded-normal-radius'>
          {/* 회차-댓글 전환 버튼 */}
          <div className='flex flex-row py-3 text-lg'>
            <button
              className={`w-full ${activeTab === BookDetailTabType.Episodes ? 'underline underline-offset-2' : ''}`}
              onClick={() => setActiveTab(BookDetailTabType.Episodes)}
            >
              회차 정보
            </button>
            <button
              className={`w-full bg-opacity-0 ${activeTab === BookDetailTabType.Comments ? 'underline underline-offset-2' : ''}`}
              onClick={() => setActiveTab(BookDetailTabType.Comments)}
            >
              댓글
            </button>
          </div>
          <div id='tap-content' className='p-2'>

            {activeTab === BookDetailTabType.Episodes && (
              <div
                className='flex flex-row bg-gray-200 mb-2 mx-1 px-3 py-3 justify-center rounded-normal-radius hover:bg-gray-300 cursor-pointer'
                onClick={openEpisodeUploadModal}
              >
                <div className='flex flex-row items-center gap-2'>
                  <FaPlus />
                  <div className='font-medium text-md'>새 에피소드 업로드</div>
                </div>
              </div>
            )}
            {/* 회차 정보 */}
            <div className='flex flex-col gap-1'>
              {activeTab === BookDetailTabType.Episodes && episodeList && episodeList.length > 0 &&
                episodeList.map((ep) => (
                  <EpisodeListItem
                    key={ep.id}
                    episodeId={ep.id}
                    chapterNum={Number(ep.chapter)}
                    episodeTitle={ep.title}
                    onClick={handleUpdateEpisode}
                    onDelete={deleteEpisode}
                  />
                ))}
            </div>
            <div>
              {activeTab === BookDetailTabType.Comments &&
                commentList.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      episodeNumber={comment.episodeNumber}
                      userName={comment.userName}
                      content={comment.content}
                      createdAt={parseDateTime(comment.createdAt)}
                    />
                  ),
                )
              }
            </div>
          </div>
        </div>
      </div>

      {/* open episode uplosd modal */}
      {isEpisodeUploadModalOpened && novelId && (
        <div><UploadEpisode novelId={novelId} title={novelDetail.title} onClose={closeEpisodeUploadModal} /></div>
      )}

      {/* open episode detail modal*/}
      {isEpisodeDetailModalOpened && novelId && selectedEpisodeId && (
        <UpdateEpisode episodeId={selectedEpisodeId} onClose={() => setEpisodeDetailModalOpened(false)} />
      )}
    </>
  );
}

export default BookDetail;