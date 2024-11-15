import React, {useRef, useState} from 'react';

// css
import {AiOutlineUpload} from 'react-icons/ai';

// project
import InputBox from '../../components/InputBox.tsx';
import MainButton from '../../components/MainButton';
import {post, putPresignedUrl} from '../../api/api.ts';
import {AxiosRequestHeaders} from 'axios';

interface UploadEpisodeProps {
    novelId: string;
    title: string;
    onClose: () => void;
}

interface PresignedUrlResponse {
    data: {
        novelId: string,
        presignedUrl: string;
    };
}

interface EpisodeData {
    title: string;
    scheduledReleaseDate?: string;
    releasedDate?: string;
    releaseStatus: 'PRIVATE' | 'PUBLIC' | 'SCHEDULED';
}

function UploadEpisode({novelId, title, onClose}: UploadEpisodeProps): React.JSX.Element {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
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

    // handler
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
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        post<PresignedUrlResponse>({url: 'api/admin/episode', data: {...episodeData, 'novelId': novelId}})
            .then((res) => {
                const presignedUrl = res.data.presignedUrl;
                if (file && presignedUrl) {
                    putPresignedUrl({
                        url: presignedUrl, data: file, headers: {
                            'Content-Type': 'text/plain; charset=UTF-8'
                        } as AxiosRequestHeaders
                    })
                        .then(() => {
                            alert('업로드 성공!');
                        })
                        .catch((error) => {
                            console.error('Error uploading file:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error creating presignedURL:', error);
            });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-10 bg-white w-[800px] p-6 rounded-md shadow-lg">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-3xl font-extrabold self-start px-6 py-5">{title}</h2>
                        <div className="relative end-0.5 mb-5 flex gap-3">
                            <button type="submit"><MainButton className="w-14" label="저장"/></button>
                            <button
                                onClick={onClose}
                            ><MainButton className="w-14 bg-gray-400" label="닫기"/></button>
                        </div>
                    </div>

                    {/* 파일 업로드 */}
                    <div className="flex flex-row">
                        <h2 className="w-[250px] ml-3 text-lg font-bold">파일 업로드</h2>
                        <span
                            onClick={handleUploadClick}
                            className="flex justify-center items-center rounded-normal-radius w-28 h-32 bg-background hover:bg-gray-200 hover:cursor-pointer"><AiOutlineUpload
                            size={40}/></span>
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
                    <div className="flex flex-row">
                        <h2 className="w-[250px] ml-3 text-lg font-bold">도서 정보</h2>
                        <InputBox label="회차 제목" className="w-96" name='title' onChange={handleInputChange}/>
                    </div>

                    {/* 공개 여부 */}
                    <div className="flex">
                        <h2 className="w-[250px] ml-3 text-lg font-bold">공개 여부</h2>
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

                </div>
            </form>
        </div>
    );
}

export default UploadEpisode;