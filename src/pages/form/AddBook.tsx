import React from 'react';
import { AiOutlineUpload } from "react-icons/ai";
import { useForm } from 'react-hook-form';

// project
import MainButton from '../../components/MainButton';
import InputBox from '../../components/InputBox';
import SelectChip from "../../components/SelectChip.tsx";

type AddBookProps = {
    isOpend: boolean;
}

function AddBook({isOpend = true}: AddBookProps): React.JSX.Element | null {
    // 카테고리 추후 store에 저장
    const categories: string[] = ['고전소설', '판타지', '무협', '로맨스', '코미디', '라이트노벨', '추리', '미스테리'];

    if (isOpend) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
                <div className="flex flex-col gap-5 bg-white w-[800px] p-6 rounded-md shadow-lg">
                    {/* 저장 버튼 */}
                    <MainButton className="w-14 self-end" label="저장" />

                    {/* 표지 등록 */}
                    <div className="flex flex-row">
                        <h2 className="w-[250px] ml-3 text-lg font-bold">표지 등록</h2>
                        <span
                            className="flex justify-center items-center rounded-normal-radius w-28 h-32 bg-background"><AiOutlineUpload
                            size={40}/></span>
                    </div>

                    {/* 도서 정보 */}
                    <div className="flex flex-row">
                        <h2 className="w-[250px] ml-3 text-lg font-bold">도서 정보</h2>
                        <div className="flex flex-col gap-2.5 w-96">
                            <InputBox label="책 제목" />
                            <InputBox label="저자" />
                            <InputBox label="상세 정보" rows={4} />
                        </div>
                    </div>

                    {/* 카테고리 */}
                    <div className="flex flex-row pb-3">
                        <h2 className="w-[250px] ml-3 text-lg font-bold">카테고리</h2>
                        <div className="flex flex-wrap w-96 gap-3">
                            {categories.map((category) => (
                                <SelectChip value={category} isActivated={false} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else return null;
}

export default AddBook;