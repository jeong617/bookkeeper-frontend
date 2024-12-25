import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AxiosResponse } from 'axios';

// css
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { AiOutlineUpload } from 'react-icons/ai';

// project
import InputBox from '../../components/InputBox.tsx';
import MainButton from '../../components/MainButton';
import { get, put } from '../../api/api.ts';
import {divideIsoDateTime} from '../../utils/parseDateTime.ts';
import { debounce } from 'lodash';

interface UpdateEpisodeProps {
  episodeId: string;
  onClose: () => void;
}

function UpdateEpisode({ episodeId, onClose }: UpdateEpisodeProps): React.JSX.Element {
  const [episodeData, setEpisodeData] = useState({
    id: '',
    title: '',
    chapter: 0,
    releaseStatus: '',
    scheduledDate: undefined as string | undefined | null,
    novelId: '',
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // etc
  const { date, time } = divideIsoDateTime(episodeData.scheduledDate);

  // handler
  const handleUploadClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name, value} = e.target;
    setEpisodeData((prev) => ({...prev, [name]: value}));
  };
  const handleReleaseStatusChange = (status: 'PRIVATE' | 'PUBLIC' | 'SCHEDULED'): void => {
    setEpisodeData((prev) => ({...prev, releaseStatus: status}));
  };
  const handleScheduledDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setEpisodeData((prev) => ({
      ...prev,
      scheduledDate: name === 'date' ? `${value}T${time}${':00'}` : `${date}T${value}${':00'}`,
    }));
  };

  // api
  const debouncedSubmit = useCallback(
    debounce(async (formData: FormData) => {
      try {
        await put({url: `api/admin/episode/${episodeId}`, data: formData});
        alert('에피소드 수정 성공!');
        onClose();
      } catch (error) {
        alert('에피소드 수정 실패');
      }
    }, 300), []
  );

  const handleSubmit = (): void => {
    const formData = new FormData();
    formData.append('episodeRequest', new Blob([JSON.stringify({
      "title": episodeData.title,
      "novelId": episodeData.novelId,
      "releaseStatus": episodeData.releaseStatus,
      "scheduledDate": episodeData.scheduledDate,
    })], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    } else {
      alert('파일이 선택되지 않았습니다.');
      return;
    }
    debouncedSubmit(formData);
  };

  // api
  useEffect(() => {
    const getEpisodeDetail = async (episodeId: string) => {
      const url = `api/admin/episode/${episodeId}`;
      try {
        const res: AxiosResponse = await get({ url: url });
        setEpisodeData({
          id: res.data.id,
          title: res.data.title,
          chapter: res.data.chapter,
          releaseStatus: res.data.releaseStatus,
          scheduledDate: res.data.scheduledDate,
          novelId: res.data.novelId,
        });
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
            <h2 className='text-3xl font-extrabold'>{`Chapter${episodeData.chapter}`}</h2>
            <h3 className='text-lg font-medium'>{episodeData.title}</h3>
          </div>
          <div>
            <MainButton label='저장'
                        className='w-14 mr-3 align-top self-start hover:cursor-pointer hover:bg-button-text'
                        onClick={handleSubmit}
            />
            <MainButton label='닫기'
                        className='w-14 mr-3 align-top self-start bg-gray-400 hover:cursor-pointer hover:bg-gray-600'
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
            className="flex justify-center items-center rounded-normal-radius w-28 h-32 bg-background hover:bg-gray-200 hover:cursor-pointer"
            onClick={handleUploadClick}
          >
            <AiOutlineUpload size={40} />
          </span>
          {fileName && (<p className='px-3 py-1 text-xs self-end'>{fileName}</p>)}
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept='txt/plain'
          />
        </div>

        {/* 에피소드 정보 */}
        <div className='flex flex-row'>
          <h2 className='w-[250px] ml-3 text-lg font-bold'>회차 정보</h2>
          <InputBox label='회차 제목' name='title' className='w-96' value={episodeData.title}
                    onChange={handleInputChange}
          />
        </div>

        {/* 공개 여부 */}
        <div className='flex'>
          <h2 className='w-[250px] ml-3 text-lg font-bold'>공개 여부</h2>
          <div className='flex flex-col py-2 gap-4'>
            <div id='radio-section' className='flex flex-row'>
              <div className='flex items-center me-4'>
                <input type='radio' name='releaseStatus' value='PUBLIC'
                       className='focus:ring-0'
                       checked={episodeData.releaseStatus === 'PUBLIC'}
                       onChange={() => handleReleaseStatusChange('PUBLIC')} />
                <label className='ms-2 text-sm font-medium text-gray-900'>공개</label>
              </div>
              <div className='flex items-center me-4'>
                <input type='radio' name='releaseStatus' value='PRIVATE'
                       className='focus:ring-0'
                       checked={episodeData.releaseStatus === 'PRIVATE'}
                       onChange={() => handleReleaseStatusChange('PRIVATE')} />
                <label className='ms-2 text-sm font-medium text-gray-900'>비공개</label>
              </div>
              <div className='flex items-center me-4'>
                <input type='radio' name='releaseStatus' value='SCHEDULED'
                       className='focus:ring-0'
                       checked={episodeData.releaseStatus === 'SCHEDULED'}
                       onChange={() => handleReleaseStatusChange('SCHEDULED')} />
                <label className='ms-2 text-sm font-medium text-gray-900'>예약 공개</label>
              </div>
            </div>
            {/* DatePicker */}
            {episodeData.releaseStatus === 'SCHEDULED' && (
              <div id="select-date-time" className="flex flex-row gap-10 w-full">
                <input type="date" name='date' value={date}
                       onChange={handleScheduledDateChange}
                       className="w-44 border border-line border-opacity-20 text-sm rounded-lg block px-0.5 py-1.5 focus:ring-blue-100"/>
                <input type="time" name='time' value={time}
                       onChange={handleScheduledDateChange}
                       className="w-36 border border-line border-opacity-20 text-sm rounded-lg block px-0.5 py-1.5 focus:ring-blue-100"/>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default UpdateEpisode;