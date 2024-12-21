// project
import { Header } from '../components/header';

// css
import { Table } from 'flowbite-react';

function FileUploadMonitor(): React.JSX.Element {

  return (
    <>
      <Header />
      <div className='container mx-auto mt-20'>
        <Table>
          <Table.Head>
            <Table.HeadCell className='w-1/2'>소설명</Table.HeadCell>
            <Table.HeadCell className='w-1/4'>회차</Table.HeadCell>
            <Table.HeadCell className='w-1/4'>상태</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                동백꽃
              </Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>대기중</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default FileUploadMonitor;