import { Header } from '../components/header';
import React, { useState } from 'react';

// project
import { broadcast } from '../api/functional/broker';

// css
import { Label, Table, Textarea } from 'flowbite-react';
import { FaPaperPlane } from 'react-icons/fa6';
import { NotificationTargetType } from '../store/types.tsx';
import { toUser } from '../api/functional/broker/touser';

function PushNotification(): React.JSX.Element {
  const [target, setTarget] = useState<NotificationTargetType>(NotificationTargetType.All); // 전체 or 특정 유저 선택 상태

  const [notifications, setNotifications] = useState({
    title: '',
    message: '',
    to_email: '',
  });

  // handler
  const handleNotification = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setNotifications((prev) => ({ ...prev, [name]: value }));
  };

  const handleTargetChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTarget(event.target.value as NotificationTargetType);
    if (event.target.value === NotificationTargetType.All) {
      setNotifications((prev) => ({ ...prev, to_email: '' }));
    }
  };
  // push notification api
  const pushNotification = async () => {
    if (!notifications.title.trim() || !notifications.message.trim()) {
      alert('제목과 메시지를 입력하세요.');
      return;
    }
    if (target === NotificationTargetType.Specific && !notifications.to_email.trim()) {
      alert('이메일을 입력하세요.');
      return;
    }
    const url = import.meta.env.VITE_API_URL_NOTI;
    try {
      if (target === NotificationTargetType.All) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {to_email, ...payload} = notifications
        await broadcast({ host: url }, payload);
      } else await toUser({host: url}, notifications);
      alert('알림 전송 성공!');
    } catch {
      alert('알림 전송 실패');
    }
    setNotifications({ title: '', message: '', to_email: '' });
  };

  return (
    <>
      <Header />
      <div className='container mx-auto mt-4 md:mt-20 md:grid md:grid-cols-2'>
        <section id='notification-input'
                 className='relative w-full px-1 md:w-2/3'
        >
          {/* text area */}
          <div className='flex'>
            <div className='grow'>
              <input type='text' name='title' value={notifications.title}
                     className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-transparent focus:ring-0 focus:outline-1 focus:outline-[#DBB185]/80 focus:border block w-full p-2.5'
                     placeholder='제목을 입력하세요' required
                     onChange={handleNotification}
              />
              <Textarea name='message' placeholder='알림 메세지를 입력하세요' required rows={4} value={notifications.message}
                        className='focus:border-transparent focus:ring-0 focus:outline-1 focus:outline-[#DBB185]/80 mt-3'
                        onChange={handleNotification}
              />
            </div>
          </div>

          {/* user filter area */}
          <div className='mt-12 flex-row'>
            <div className='grow border-b-2 border-gray-200'>
              <Label value='Filter' />
            </div>
            <div className='mt-4'>
              {/*TODO: filter group 추가*/}

              <div className='flex items-center gap-4'>
                <label>
                  <input type='radio' name='target' value={NotificationTargetType.All}
                         checked={target === NotificationTargetType.All}
                         onChange={handleTargetChange}
                         className='mr-2 focus:ring-0'
                  />
                  전체 유저
                </label>
                <label>
                  <input
                    type='radio' name='target' value={NotificationTargetType.Specific}
                    checked={target === NotificationTargetType.Specific}
                    onChange={handleTargetChange}
                    className='mr-2 focus:ring-0'
                  />
                  특정 유저
                </label>
              </div>
              <div className='mt-4'>
                <Label value='EMAIL'></Label>
                <input type='email' name='to_email' value={notifications.to_email}
                       className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-transparent focus:ring-0 focus:outline-1 focus:outline-[#DBB185]/80 focus:border block w-full p-2.5 mt-2 disabled:bg-gray-200'
                       placeholder='이메일을 입력하세요'
                       onChange={handleNotification}
                       disabled={target === NotificationTargetType.All}
                />
              </div>
              <div className='mt-4 justify-self-end' onClick={pushNotification}>
                <FaPaperPlane
                  className='fill-white bg-button w-12 h-9 p-2 rounded-normal-radius hover:bg-button-text hover:cursor-pointer' />
              </div>
            </div>
          </div>
        </section>

        {/* notification history */}
        <section id='notification-history'>
          <Table className='mt-8 rounded-normal-radius md:mt-0'>
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