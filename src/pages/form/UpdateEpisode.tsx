import React, { useEffect, useState } from 'react';

// css
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { AiOutlineUpload } from 'react-icons/ai';

// project
import InputBox from '../../components/InputBox.tsx';
import MainButton from '../../components/MainButton';
import { AxiosResponse } from 'axios';
import { get } from '../../api/api.ts';
import { EpisodeDetailData } from '../../store/novelDetailInterface.ts';

interface UpdateEpisodeProps {
  episodeId: string;
  onClose: () => void;
}

function UpdateEpisode({ episodeId, onClose }: UpdateEpisodeProps): React.JSX.Element {
  const [episodeDetailData, setEpisodeDetailData] = useState<EpisodeDetailData>({
    id: '',
    title: '',
    chapter: 0,
    releaseDate: '',
    scheduledDate: '',
    releaseStatus: '',
    novelId: '',
    viewCount: 0,
    createdAt: '',
    updatedAt: '',
  });

  // api
  useEffect(() => {
    const getEpisodeDetail = async (episodeId: string) => {
      const url = `api/admin/episode/${episodeId}`;
      try {
        const res: AxiosResponse = await get({ url: url });
        setEpisodeDetailData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getEpisodeDetail(episodeId);
  }, [episodeId]);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center'>
      <div className='flex flex-col gap-10 bg-white w-[800px] p-6 rounded-md shadow-lg'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row items-end self-start px-6 py-5 gap-4'>
            <h2 className='text-3xl font-extrabold'>{`Chapter${episodeDetailData.chapter}`}</h2>
            <h3 className='text-lg font-medium'>{episodeDetailData.title}</h3>
          </div>
          <div>
            <MainButton label='저장' className='w-14 mr-3 align-top self-start hover:cursor-pointer' />
            <MainButton label='닫기' className='w-14 mr-3 align-top self-start bg-gray-400 hover:cursor-pointer'
                        onClick={onClose} />
          </div>
        </div>

        {/* 음성파일 재생성요청 */}
        <div className='flex flex-row'>
          <h2 className='w-[250px] ml-3 pr-8 text-lg font-bold'>음성 파일 재생성</h2>
          <FaCloudDownloadAlt size={20} className='self-center' />
        </div>


        {/* 파일 업로드 */}
        <div className='flex flex-row'>
          <h2 className='w-[250px] ml-3 text-lg font-bold'>교체 파일</h2>
          <span
            className='flex justify-center items-center rounded-normal-radius w-28 h-32 bg-background'><AiOutlineUpload
            size={40} /></span>
        </div>

        {/* 에피소드 정보 */}
        <div className='flex flex-row'>
          <h2 className='w-[250px] ml-3 text-lg font-bold'>회차 정보</h2>
          <InputBox label='회차 제목' className='w-96' defaultValue='' />
        </div>

        {/* 공개 여부 */}
        <div className='flex'>
          <h2 className='w-[250px] ml-3 text-lg font-bold'>공개 여부</h2>
          <div className='flex flex-col py-2 gap-4'>
            <div id='radio-section' className='flex flex-row'>
              <div className='flex items-center me-4'>
                <input type='radio'
                       className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500' />
                <label className='ms-2 text-sm font-medium text-gray-900'>공개</label>
              </div>
              <div className='flex items-center me-4'>
                <input type='radio'
                       className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500' />
                <label className='ms-2 text-sm font-medium text-gray-900'>비공개</label>
              </div>
              <div className='flex items-center me-4'>
                <input type='radio'
                       className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500' />
                <label className='ms-2 text-sm font-medium text-gray-900'>예약 공개</label>
              </div>
            </div>
            {/* DatePicker */}
            <div id='select-date-time'
                 className='flex flex-row gap-10 w-full'
            >
              <input type='date'
                     className='w-44 border border-line border-opacity-20 text-sm rounded-lg block px-0.5 py-1.5 focus:ring-blue-100' />
              <input type='time' defaultValue='09:00' min='00:00' max='11:59'
                     className='w-36 border border-line border-opacity-20 text-sm rounded-lg block px-0.5 py-1.5 focus:ring-blue-100' />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UpdateEpisode;