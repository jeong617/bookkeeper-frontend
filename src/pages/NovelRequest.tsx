import {useState} from 'react';

// project
import {novelRequestList} from '../api/mock/novelRequestList.ts';
import { getNovelList } from '../api/functional/novel/list';

// css
import {Header} from '../components/header';
import {Table, Dropdown} from 'flowbite-react';

function NovelRequest(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const communityUrl = import.meta.env.VITE_API_URL_NOTI;
  const novels = novelRequestList;

  // handler
  const toggleDetailInfo = (index: number) => {
    if (openIndex === index) setOpenIndex(null);
    else setOpenIndex(index);
  }

  // api
  const getReqNovels = async () => {
    try {
      const res = await getNovelList(
        {host: communityUrl},
        {page: currentPage, orderBy: 'desc'});
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  getReqNovels();

  return (
    <>
      <Header/>
      <div className='container mx-auto mt-2 md:mt-20'>
        <Table className='rounded-normal-radius'>
          <Table.Head>
            <Table.HeadCell className='w-2/5'>소설명</Table.HeadCell>
            <Table.HeadCell className='w-2/5'>요청자</Table.HeadCell>
            <Table.HeadCell className='w-1/5'>상태</Table.HeadCell>
          </Table.Head>
          <Table.Body className='border-b'>
            {novels
              && novels.map((novel, index) => (
              <>
                <Table.Row className='bg-white border-t dark:border-gray-700 hover:cursor-pointer'
                           key={index}
                           onClick={() => toggleDetailInfo(index)}
                >
                  <Table.Cell className='whitespace-nowrap overflow-hidden font-medium text-gray-900 dark:text-white'>
                    {novel.novel.novelInfo.title}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap overflow-hidden font-medium text-gray-900 dark:text-white'>
                    {novel.novel.novelStatus.responsiblePersonEmail}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap overflow-hidden font-medium text-gray-900 dark:text-white'>
                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                            className="text-gray-900 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"
                    >
                      {novel.novel.novelStatus.reason}
                      <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" /></svg>
                    </button>
                    <div id="dropdown"
                         className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton">
                        <li>
                          <a href="#"
                             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                          <a href="#"
                             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                          <a href="#"
                             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                        </li>
                        <li>
                          <a href="#"
                             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                            out</a>
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
                        <p>📧 요청자: {novel.novel.novelStatus.responsiblePersonEmail}</p>
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
    </>
  )
}

export default NovelRequest;