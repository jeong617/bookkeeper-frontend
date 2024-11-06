import React from 'react';


// css
import { AiOutlineUpload } from "react-icons/ai";

// project
import InputBox from "../../components/InputBox.tsx";
import MainButton from "../../components/MainButton";

interface UploadEpisodeProps {
    title: string;
}

function UploadEpisode({title}: UploadEpisodeProps): React.JSX.Element {


    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
            <div className="flex flex-col gap-10 bg-white w-[800px] p-6 rounded-md shadow-lg">
                <div className="flex flex-row justify-between">
                    <h2 className="text-3xl font-extrabold self-start px-6 py-5">{title}</h2>
                    <MainButton label="저장" className="w-14 mr-3 align-top self-end"/>
                </div>

                {/* 파일 업로드 */}
                <div className="flex flex-row">
                    <h2 className="w-[250px] ml-3 text-lg font-bold">파일 업로드</h2>
                    <span
                        className="flex justify-center items-center rounded-normal-radius w-28 h-32 bg-background"><AiOutlineUpload
                        size={40}/></span>
                </div>

                {/* 에피소드 제목 */}
                <div className="flex flex-row">
                    <h2 className="w-[250px] ml-3 text-lg font-bold">도서 정보</h2>
                    <InputBox label="회차 제목" className="w-96"/>
                </div>

                {/* 공개 여부 */}
                <div className="flex">
                    <h2 className="w-[250px] ml-3 text-lg font-bold">공개 여부</h2>
                    <div className="flex flex-col py-2 gap-4">
                        <div id="radio-section" className="flex flex-row">
                            <div className="flex items-center me-4">
                                <input type="radio"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                                <label className="ms-2 text-sm font-medium text-gray-900">공개</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                                <label className="ms-2 text-sm font-medium text-gray-900">비공개</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                                <label className="ms-2 text-sm font-medium text-gray-900">예약 공개</label>
                            </div>
                        </div>
                        {/* DatePicker */}
                        <div id="select-date-time"
                             className="flex flex-row gap-10 w-full"
                        >
                            <input type="date" className="w-44 border border-line border-opacity-20 text-sm rounded-lg block px-0.5 py-1.5 focus:ring-blue-100" />
                            <input type="time" defaultValue="09:00" min="00:00" max="11:59" className="w-36 border border-line border-opacity-20 text-sm rounded-lg block px-0.5 py-1.5 focus:ring-blue-100" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UploadEpisode;