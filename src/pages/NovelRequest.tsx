import {useState} from 'react';

// project
import {novelRequestList} from '../api/mock/novelRequestList.ts';

// css
import {Header} from '../components/header';
import {Table} from 'flowbite-react';

function NovelRequest(): React.JSX.Element {
  const novels = novelRequestList;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // handler
  const toggleDetailInfo = (index: number) => {
    if (openIndex === index) setOpenIndex(null);
    else setOpenIndex(index);
  }

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
                    {novel.novel.novelStatus.reason}
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
        <p>{openIndex}</p>
      </div>
    </>
  )
}

export default NovelRequest;