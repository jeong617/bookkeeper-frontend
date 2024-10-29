import React, {useState} from 'react';

// project
import {Header} from "../../components/header";
import FormButton from "../../components/FormButton.tsx";
import EpisodeListItem from "../../components/EpisodeListItem.tsx";
import CommentItem from "../../components/CommentItem.tsx";

// css
import {FaPen, FaRegTrashAlt, FaHeart, FaTrashAlt} from "react-icons/fa";

interface BookDetailProps {
    title: string;
    coverImageUrl: string;
    author: string;
    summary: string;
    like: number;
    chapterList: object[];
}

type TapType = "episodes" | "comments";

function BookDetail({
    title, coverImageUrl, author, summary, like, chapterList
    }: BookDetailProps): React.JSX.Element {
    const [activeTab, setActiveTab] = useState("episodes");

    return (
        <>
            <Header />
            <div className="container px-48 mx-auto mt-12">
                {/* 도서 기본 정보 */}
                <div className="flex flex-row gap-5 p-1">
                    <img src={coverImageUrl} className="w-48 h-64 rounded-normal-radius shadow-md" />
                    <div className="flex flex-col w-full items-start justify-between py-2">
                        <div id="basic-section" className="flex flex-row w-full items-center justify-between">
                            <div id="basic-info" className="flex flex-col">
                                <span className="text-3xl font-extrabold">{title}</span>
                                <span className="font-medium">{author}</span>
                            </div>
                            <div id="form-button" className="flex flex-row gap-5 px-2 items-center">
                                <FormButton label="수정" icon={<FaPen size={13} className="fill-button-text" />}/>
                                <FaTrashAlt size={25} className="fill-red-500" />
                            </div>
                        </div>                        <span className="text-sm">{summary}</span>
                        <div id="like-number" className="flex justify-start gap-1">
                            <FaHeart fill="red" />
                            <span className="text-xs">{like}</span>
                        </div>
                    </div>
                </div>

                {/* 회차 정보 */}
                <div className="bg-gray-50 w-full mt-12 rounded-normal-radius">
                    {/* 회차-댓글 전환 버튼 */}
                    <div className="flex flex-row py-3 text-lg">
                        <button
                            className="w-full"
                            onClick={() => setActiveTab("episodes")}
                        >회차 정보</button>
                        <button
                            className="w-full bg-opacity-0"
                            onClick={() => setActiveTab("comments")}
                        >댓글</button>
                    </div>
                    <div id="tap-content" className="p-2">
                        {activeTab === "episodes" && <EpisodeListItem chapterNum={1} episodeTitle="두 개의 세계" />}
                        {activeTab === "comments" && <CommentItem chapter={1} nickname="크리스탈" comment="잼써요" created_at="2024-10-28 15:39" />}
                    </div>
                </div>

            </div>
        </>
    )
}

export default BookDetail;