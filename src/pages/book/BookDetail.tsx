import { useParams, useLoaderData } from 'react-router-dom';
import React, { useState } from 'react';

// project
import { Header } from '../../components/header';
import FormButton from '../../components/FormButton.tsx';
import EpisodeListItem from '../../components/EpisodeListItem.tsx';
import CommentItem from '../../components/CommentItem.tsx';
import { BookDetailTabType } from '../../store/types.tsx';
import { NovelDetailData } from '../../store/novelDetailData.ts';
import PopUp from '../form/PopUp.tsx';
import { episodeList } from '../../api/mock/episodeList.ts';
import { commentList } from '../../api/mock/commentList.ts';

// css
import { FaPen, FaHeart, FaTrashAlt, FaPlus } from 'react-icons/fa';
import UploadEpisode from '../form/UploadEpisode.tsx';

function BookDetail(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<BookDetailTabType>(BookDetailTabType.Episodes);
  const [popWarning, setPopWarning] = useState<boolean>(false);
  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const { novelId } = useParams<{ novelId: string }>();
  const { novelDetail } = useLoaderData() as { novelDetail: NovelDetailData };

  // etc.
  const defaultImage = '/src/assets/book-cover/default-book-cover.jpg';

  // handler
  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  return (
    <>
      <Header />
      <div className="container px-48 mx-auto mt-12">
        {/* 도서 기본 정보 */}
        <div className="flex flex-row gap-5 p-1">
          <img
            alt="book-cover-image"
            src={novelDetail.coverImageUrl}
            className="w-48 h-64 rounded-normal-radius shadow-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = defaultImage;
            }}
          />
          <div className="flex flex-col w-full items-start justify-between py-2">
            <div
              id="basic-section"
              className="flex flex-row w-full items-center justify-between"
            >
              <div id="basic-info" className="flex flex-col">
                <span className="text-3xl font-extrabold">{novelDetail.title}</span>
                <span className="font-medium">{novelDetail.authorList.join(', ')}</span>
              </div>
              <div
                id="form-button"
                className="flex flex-row gap-5 px-2 items-center"
              >
                <FormButton
                  label="수정"
                  icon={<FaPen size={13} className="fill-button-text" />}
                />
                <button
                  onClick={() => setPopWarning(true)}
                ><FaTrashAlt size={25} className="fill-red-500" />
                </button>
                {popWarning && (
                  <PopUp isOpened={popWarning} onClose={() => setPopWarning(false)} />
                )}
              </div>
            </div>
            <span className="text-sm text-start">{novelDetail.summary}</span>
            <div id="like-number" className="flex justify-start gap-1">
              <FaHeart fill="red" />
              <span className="text-xs">{novelDetail.likes}</span>
            </div>
          </div>
        </div>

        {/* 회차 정보 */}
        <div className="bg-gray-50 w-full mt-12 rounded-normal-radius">
          {/* 회차-댓글 전환 버튼 */}
          <div className="flex flex-row py-3 text-lg">
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
          <div id="tap-content" className="p-2">
            {activeTab === BookDetailTabType.Episodes && (
              <div
                className="flex flex-row bg-gray-200 mx-1 px-3 py-3 justify-center rounded-normal-radius hover:bg-gray-300 cursor-pointer"
                onClick={openModal}
              >
                <div className="flex flex-row items-center gap-2">
                  <FaPlus />
                  <div className="font-medium text-md">새 에피소드 업로드</div>
                </div>
              </div>
            )}
            {BookDetailTabType.Episodes && episodeList && episodeList.length > 0 &&
              episodeList.map((ep) => (
                <EpisodeListItem
                  key={ep.id}
                  chapterNum={Number(ep.chapter)}
                  episodeTitle={ep.title}
                />
              ))}
            {activeTab === BookDetailTabType.Comments &&
              commentList.map((comment) => (
                  <CommentItem
                    chapter={comment.episodeNum}
                    nickname="크리스탈"
                    comment="잼써요"
                    createdAt="2024-10-28 15:39"
                  />
                ),
              )
            }
          </div>
        </div>
      </div>

      {/* open modal */}
      {isModalOpened && novelId && (
        <div><UploadEpisode novelId={novelId} title={novelDetail.title} onClose={closeModal} /></div>
      )}
    </>
  );
}

export default BookDetail;
