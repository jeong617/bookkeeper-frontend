import React, {useCallback, useEffect, useRef, useState} from 'react';
import { debounce } from 'lodash';

// css
import { AiOutlineUpload } from 'react-icons/ai';

// project
import InputBox from '../../components/InputBox.tsx';
import MainButton from '../../components/MainButton';
import { post } from '../../api/api.ts';
import {useFileStore, useLayoutStore} from '../../store/store.tsx';
import { AxiosResponse } from 'axios';
import { TTSUploadStatusType } from '../../store/types.tsx';

interface UploadEpisodeProps {
    novelId: string;
    title: string;
    onClose: () => void;
}

interface EpisodeData {
    title: string;
    scheduledReleaseDate?: string;
    releasedDate?: string;
    releaseStatus: 'PRIVATE' | 'PUBLIC' | 'SCHEDULED';
}

function UploadEpisode({novelId, title, onClose}: UploadEpisodeProps): React.JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { addFile } = useFileStore();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [episodeData, setEpisodeData] = useState<EpisodeData>({
        title: '',
        scheduledReleaseDate: undefined,
        releasedDate: undefined,
        releaseStatus: 'PUBLIC',
    });
    const [scheduleDate, setScheduleDate] = useState<string>('');
    const [scheduleTime, setScheduleTime] = useState<string>('09:00');
    const { isMobile, setIsMobile } = useLayoutStore();

    // handler
    const handleBackgroundClick = () => {
        if (!isMobile) {
            onClose();
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
    console.log(episodeData.title);
    const handleReleaseStatusChange = (status: 'PRIVATE' | 'PUBLIC' | 'SCHEDULED'): void => {
        setEpisodeData((prev) => ({...prev, releaseStatus: status}));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setScheduleDate(e.target.value);
        updateScheduledReleaseDate(e.target.value, scheduleTime);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setScheduleTime(e.target.value);
        updateScheduledReleaseDate(scheduleDate, e.target.value);
    };

    const updateScheduledReleaseDate = (date: string, time: string): void => {
        if (date && time) {
            setEpisodeData((prev) => ({
                ...prev,
                scheduledReleaseDate: `${date}T${time}:00`,
            }));
        }
    };
    const handleUploadClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // api
    const debouncedSubmit = useCallback(
      debounce(async (formData: FormData, episodeTitle: string) => {
          try {
              const res : AxiosResponse = await post({ url: 'api/admin/episode', data: formData });
              alert('업로드 성공!');
              addFile({
                  id: res.data.data.episodeId,
                  novelTitle: episodeTitle,
                  episodeTitle: episodeTitle,
                  status: TTSUploadStatusType.Pending
              })
              onClose();
          } catch (error) {
              console.error('episode upload error: ', error);
          }
      }, 300), []
    );

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('episodeRequest', new Blob([JSON.stringify({...episodeData, 'novelId' : novelId})], { type: 'application/json' }));
        if (file) {
            formData.append('file', file);
        } else {
            console.error('파일이 선택되지 않았습니다.');
            return;
        }
        debouncedSubmit(formData, episodeData.title);
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsMobile]);

    return (
        <div className="fixed z-30 inset-0 flex bg-white justify-center md:items-center md:bg-black md:bg-opacity-20"
             onClick={handleBackgroundClick}
        >
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-10 bg-white md:w-[800px] p-6 md:rounded-md md:shadow-lg">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-3xl font-extrabold self-start px-6 py-5">{title}</h2>
                        {/* Desktop 닫기&저장 버튼 */}
                        <div className="hidden relative end-0.5 mb-5 md:flex gap-3">
                            <button type="submit">
                                <MainButton className="w-14 hover:bg-button-text" label="저장"/>
                            </button>
                            <button
                              onClick={onClose}
                            >
                                <MainButton className="w-14 bg-gray-400" label="닫기"/>
                            </button>
                        </div>
                    </div>

                    {/* 파일 업로드 */}
                    <div className="md:flex">
                        <h2 className="w-[250px] text-lg font-bold md:ml-3">파일 업로드</h2>
                        <span
                          onClick={handleUploadClick}
                          className="flex justify-center items-center place-self-center rounded-normal-radius w-28 h-32 bg-background hover:bg-gray-200 hover:cursor-pointer">
                            <AiOutlineUpload size={40}/>
                        </span>
                        {fileName && (<p className="px-3 py-1 text-xs self-end">{fileName}</p>)}
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{display: 'none'}}
                          onChange={handleFileChange}
                          accept="txt/plain"
                        />
                    </div>

                    {/* 에피소드 제목 */}
                    <div className="md:flex">
                        <h2 className="w-[250px] md:ml-3 text-lg font-bold">도서 정보</h2>
                        <InputBox label="회차 제목" className="w-96" name='title' value={episodeData.title}
                                  onChange={handleInputChange}/>
                    </div>

                    {/* 공개 여부 */}
                    <div className="md:flex">
                        <h2 className="w-[250px] md:ml-3 text-lg font-bold">공개 여부</h2>
                        <div className="flex flex-col py-2 gap-4">
                            <div id="radio-section" className="flex flex-row">
                                <div className="flex items-center me-4">
                                    <input type="radio" name="releaseStatus" value="PUBLIC"
                                           className='focus:ring-0'
                                           checked={episodeData.releaseStatus === 'PUBLIC'}
                                           onChange={() => handleReleaseStatusChange('PUBLIC')}/>
                                    <label className="ms-2 text-sm font-medium text-gray-900">공개</label>
                                </div>
                                <div className="flex items-center me-4">
                                    <input type="radio" name="releaseStatus" value="PRIVATE"
                                           className='focus:ring-0'
                                           checked={episodeData.releaseStatus === 'PRIVATE'}
                                           onChange={() => handleReleaseStatusChange('PRIVATE')}/>
                                    <label className="ms-2 text-sm font-medium text-gray-900">비공개</label>
                                </div>
                                <div className="flex items-center me-4">
                                    <input type="radio" name="releaseStatus" value="SCHEDULED"
                                           className='focus:ring-0'
                                           checked={episodeData.releaseStatus === 'SCHEDULED'}
                                           onChange={() => handleReleaseStatusChange('SCHEDULED')}/>
                                    <label className="ms-2 text-sm font-medium text-gray-900">예약 공개</label>
                                </div>
                            </div>
                            {/* DatePicker */}
                            {episodeData.releaseStatus === 'SCHEDULED' && (
                              <div id="select-date-time" className="flex flex-row gap-10 w-full">
                                  <input type="date" value={scheduleDate} onChange={handleDateChange}
                                         className="w-44 border border-line border-opacity-20 text-sm rounded-lg block px-0.5 py-1.5 focus:ring-blue-100"/>
                                  <input type="time" value={scheduleTime} onChange={handleTimeChange}
                                         className="w-36 border border-line border-opacity-20 text-sm rounded-lg block px-0.5 py-1.5 focus:ring-blue-100"/>
                              </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile 닫기&저장 버튼 */}
                    <div className="relative place-self-center end-0.5 mb-5 gap-3 md:hidden">
                        <button type="submit">
                            <MainButton className="w-14 mx-1 md:mx-0 hover:bg-button-text" label="저장"/>
                        </button>
                        <button
                          onClick={onClose}
                        >
                            <MainButton className="w-14 mx-1 md:mx-0 bg-gray-400" label="닫기"/>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UploadEpisode;