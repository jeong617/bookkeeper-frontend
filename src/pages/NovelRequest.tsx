import React, {useEffect, useState} from 'react';
import {useLoaderData} from 'react-router-dom';

// project
import {getNovelList} from '../api/functional/novel/list';
import {SuccessResponse} from '../api/functional/broker';
import {ReqNovelData} from '../store/notificationData.ts';
import {deleteNovel} from '../api/functional/novel';
import getToken from '../utils/getToken.ts';
import {updateReviewStatus} from '../api/functional/novel/status';
import {ReqNovelReason, ReqNovelStatus} from '../store/types.tsx';

// css
import {Header} from '../components/header';
import {Table, Pagination} from 'flowbite-react';
import {FaUser} from "react-icons/fa";

function NovelRequest(): React.JSX.Element {
  const { reqNovels } = useLoaderData() as { reqNovels: SuccessResponse<any> };
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(reqNovels.data.totalCount);
  const novelList: ReqNovelData[] = reqNovels.data.list;

  // handler
  const toggleDetailInfo = (index: number) => {
    if (openIndex === index) setOpenIndex(null);
    else setOpenIndex(index);
  }
  const toggleDropdown = (index: number) => {
    if (dropdownIndex === index) setDropdownIndex(null);
    else setDropdownIndex(index);
  }

  // api
  const getReqNovels = async () => {
    try {
      const res: any = await getNovelList(
        {host: import.meta.env.VITE_API_URL_NOTI},
        {page: currentPage, orderBy: 'desc'}
      );
      setTotalPage(res.data.totalCount)
    } catch (error) {
      console.error(error);
    }
  }
  const delReqNovel = async (id: string) => {
    try {
      await deleteNovel(
        {
          host: import.meta.env.VITE_API_URL_NOTI,
          headers: {Authorization: `Bearer ${getToken()}`}
        },
        {id: id}
      );
    } catch (error) {
      console.error(error);
    }
  }
  const updateStatusNovel = async (novel: ReqNovelData, reason: ReqNovelReason, status: ReqNovelStatus ) => {
    try {
      await updateReviewStatus(
        {
          host: import.meta.env.VITE_API_URL_NOTI,
          headers: {Authorization: `Bearer ${getToken()}`}
        },
        {
          statusId: novel.novel.novelStatus.id,
          reason: reason,
          status: status,
          responsiblePersonEmail: novel.novel.novelStatus.responsiblePersonEmail,
          responsiblePerson: novel.novel.novelStatus.responsiblePerson,
          requesterEmail: novel.novel.novelStatus.responsiblePersonEmail
        }
      )
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getReqNovels();
  }, [currentPage]);

  return (
    <>
      <Header/>
      <div className='container mx-auto mt-2 md:mt-20'>
        <Table className='rounded-normal-radius overflow-hidden w-full'>
          <Table.Head>
            <Table.HeadCell className='w-2/5'>소설명</Table.HeadCell>
            <Table.HeadCell className='w-2/5'>요청자</Table.HeadCell>
            <Table.HeadCell className='w-1/5'>상태</Table.HeadCell>
          </Table.Head>
          <Table.Body className='border-b'>
            {novelList
              && novelList.map((novel, index) => (
                <>
                  <Table.Row className='bg-white border-t hover:cursor-pointer'
                             onClick={() => toggleDetailInfo(index)}
                  >
                    <Table.Cell className='w-2/5 whitespace-nowrap overflow-hidden font-medium text-gray-900'>
                      {novel.novel.novelInfo.title}
                    </Table.Cell>
                    <Table.Cell
                      className='w-2/5 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-gray-900'>
                      <p>{novel.novel.novelStatus.responsiblePerson}</p>
                    </Table.Cell>
                    <Table.Cell className='w-1/5 whitespace-nowrap overflow-hidden font-medium text-gray-900'
                                onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="text-white bg-button px-2 py-1 hover:bg-button-text focus:ring-0 focus:outline-none font-medium rounded-md text-sm text-center inline-flex items-center"
                        onClick={() => toggleDropdown(index)}
                      >
                        {novel.novel.novelStatus.status}
                        <svg className="w-2 h-2 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m1 1 4 4 4-4"/>
                        </svg>
                      </button>
                      <div
                        className={`absolute z-10 bg-white divide-gray-100 rounded-normal-radius shadow ${dropdownIndex === index ? 'block' : 'hidden'}`}
                      >
                        <ul className="justify-center items-center text-sm text-gray-700 divide-y">
                          <li className="px-2 py-2 hover:bg-gray-100"
                              onClick={() => updateStatusNovel(novel, ReqNovelReason.Pending, ReqNovelStatus.Pending)}
                          >
                            pending
                          </li>
                          <li className="px-2 py-2 hover:bg-gray-100"
                              onClick={() => updateStatusNovel(novel, ReqNovelReason.Reviewed, ReqNovelStatus.Reviewed)}
                          >
                            reviewed
                          </li>
                          <li className="px-2 py-2 hover:bg-gray-100"
                              onClick={() => updateStatusNovel(novel, ReqNovelReason.Confirm, ReqNovelStatus.Confirm)}
                          >
                            confirmed
                          </li>
                          <li className="px-2 py-2 hover:bg-gray-100"
                              onClick={() => delReqNovel(novel.id)}
                          >
                            canceled
                          </li>
                        </ul>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell colSpan={3} className='p-0'>
                      <div className={`duration-300 ease-in-out overflow-hidden
                        ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="bg-gray-100 text-gray-700 p-4">
                          <p>📖 제목: {novel.novel.novelInfo.title}</p>
                          <span className='flex'><FaUser/> <p>&nbsp;요청자: {novel.novel.novelStatus.responsiblePerson}</p></span>
                          <p>📧 요청자 이메일: {novel.novel.novelStatus.responsiblePersonEmail}</p>
                          <p>🔗 참고 링크: {novel.novel.novelInfo.ref}</p>
                          <p>📌 요청 상태: {novel.novel.novelStatus.reason}</p>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                </>
              ))
            }
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={() => setCurrentPage((prev) => prev + 1)}
          totalPages={totalPage}
          previousLabel=""
          nextLabel=""
          showIcons
        />
      </div>
    </>
  )
}

export default NovelRequest;