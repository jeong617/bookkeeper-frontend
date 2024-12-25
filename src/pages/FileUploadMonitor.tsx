// project
import { Header } from '../components/header';
import { useBackgroundUploader } from '../utils/backgroundUploader.ts';

// css
import { Table } from 'flowbite-react';
import { useFileStore } from '../store/store.tsx';
import { TTSUploadStatusType } from '../store/types.tsx';

function FileUploadMonitor(): React.JSX.Element {
  useBackgroundUploader();
  const { files } = useFileStore();
  console.log(files);

  return (
    <>
      <Header />
      <div className='container mx-auto mt-20'>
        <Table className='rounded-normal-radius'>
          <Table.Head>
            <Table.HeadCell className='w-2/5'>소설명</Table.HeadCell>
            <Table.HeadCell className='w-2/5'>에피소드명</Table.HeadCell>
            <Table.HeadCell className='w-1/5'>상태</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {files && files.map((file) =>
              (<Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {file.novelTitle}
                </Table.Cell>
                <Table.Cell>{file.episodeTitle}</Table.Cell>
                {file.status === TTSUploadStatusType.Pending
                  ? (<Table.Cell>대기중</Table.Cell>)
                  : file.status === TTSUploadStatusType.Progress
                    ? (<Table.Cell className='text-green-500'>진행중</Table.Cell>)
                    : file.status === TTSUploadStatusType.Completed
                      ? (<Table.Cell className='text-blue-500'>완료</Table.Cell>)
                      : (<Table.Cell className='text-red-600'>실패</Table.Cell>)
                }
              </Table.Row>))
            }
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default FileUploadMonitor;