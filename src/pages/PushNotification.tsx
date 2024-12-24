import { Header } from '../components/header';
import React, { useState } from 'react';

// project
import { broadcast } from '../api/functional/broker';

// css
import { Label, Table, Textarea, TextInput } from 'flowbite-react';
import { FaPaperPlane } from 'react-icons/fa6';

function PushNotification(): React.JSX.Element {
  const [notifications, setNotifications] = useState({
    title: '',
    message: '',
  });

  // handler
  const handleNotification = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name, value} = event.target;
    setNotifications((prev) => ({...prev, [name]: value}));
  };

  // push notification api
    const pushNotification = async () => {
      if (!notifications.title.trim() || !notifications.message.trim()) {
        alert("알림 메시지를 입력하세요.");
        return;
      }
      try {
        await broadcast({ host: "http://13.125.197.39:3001", }, notifications);
        alert('알림 전송 성공!');
      } catch (error) {
        alert('알림 전송 실패');
      }
      console.log("알림 메시지 전송:", notifications);
      setNotifications({title: '', message: ''});
    };

  return (
    <>
      <Header />
      <div className='container mx-auto mt-20 grid grid-cols-2'>
        <section id='notification-input'
                 className='relative w-2/3'
        >
          {/* text area */}
          <div className='flex'>
            <div className='grow'>
              <TextInput name='title' placeholder='제목을 입력하세요' required
                         onChange={handleNotification}
              />
              <Textarea name='message' placeholder='알림 메세지를 입력하세요' required rows={4}
                        className='focus:border-transparent focus:ring-0 focus:outline-1 focus:outline-[#DBB185]/80 mt-3'
                        onChange={handleNotification}
              />
            </div>
            <span onClick={pushNotification}>
              <FaPaperPlane className='fill-white bg-button mx-2 w-10 h-8 p-2 rounded-normal-radius hover:bg-button-text hover:cursor-pointer' />
            </span>
          </div>

          {/* user filter area */}
          <div className='mt-12 flex-row'>
            <div className='grow border-b-2 border-gray-200'>
              <Label value='Filter' />
            </div>
            <div className='mt-2'>
              {/*TODO: filter group 추가*/}
              <p>TODO: 필터링 정보 받은 후 추가</p>
            </div>
          </div>
        </section>

        {/* notification history */}
        <section id='notification-history'>
          <Table className='rounded-normal-radius'>
            <Table.Head>
              <Table.HeadCell className='w-4/6'>내용</Table.HeadCell>
              <Table.HeadCell>시간</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white'>
                <Table.Cell className='font-medium text-gray-900'>
                  알림 1
                </Table.Cell>
                <Table.Cell>2024.12.20(금) 20:20:20</Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>
                  알림 2
                </Table.Cell>
                <Table.Cell>2024.12.21(토) 21:21:21</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </section>
      </div>
    </>
  );
}

export default PushNotification;