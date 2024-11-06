import React, { useRef, useState } from 'react';
import { AiOutlineUpload, AiOutlinePlus } from 'react-icons/ai';

// project
import MainButton from "../../components/MainButton";
import InputBox from "../../components/InputBox";
import { CategoryType } from '../../store/types.tsx';

// css
import {Button} from "flowbite-react";

type AddBookProps = {
  isOpened: boolean;
  onClose: () => void;
};

function AddBook({ isOpened, onClose }: AddBookProps): React.JSX.Element | null {
  const categories: string[] = Object.values(CategoryType);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // handler
  const handleUploadClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      console.log("선택한 파일: ", file);
    }
  }

  return (
    <>
      {isOpened && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center"
        >
          <div className="flex flex-col gap-5 bg-white w-[900px] p-6 rounded-md shadow-lg">
            {/* 저장 버튼 */}
            <div className="fixed flex self-end gap-3">
              <button><MainButton className="w-14" label="저장" /></button>
              <button
                onClick={onClose}
              ><MainButton className="w-14 bg-gray-400" label="닫기" /></button>
            </div>

            {/* 표지 등록 */}
            <div className="flex flex-row pt-8">
              <h2 className="w-[250px] ml-10 text-lg font-bold">표지 등록</h2>
              <span className="flex flex-col justify-center items-center rounded-normal-radius w-28 h-32 bg-background hover:bg-gray-200 hover:cursor-pointer"
                    onClick={handleUploadClick}>
                <AiOutlineUpload size={40} />
              </span>
              {fileName && (<p className='px-3 py-1 text-xs self-end'>{fileName}</p>)}
              <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}/>
            </div>

            {/* 도서 정보 */}
            <div className="flex flex-row">
              <h2 className="w-[250px] ml-10 text-lg font-bold">도서 정보</h2>
              <div className="flex flex-col gap-2.5 w-96">
                <InputBox label="책 제목" />
                <div className="flex items-end">
                  <InputBox label="저자" />
                  <button className="w-10">
                    <AiOutlinePlus className="fill-button-text mx-2 mb-2" />
                  </button>
                </div>
                <div className={`flex flex-col items-start`}>
                  <label htmlFor="label"
                         className="block ml-1 mb-1 text-xs font-medium text-line">출판년도</label>
                  <input
                    type="number"
                    className={`border border-line border-opacity-20 text-sm rounded-lg block w-full px-0.5 py-1.5 focus:ring-blue-100`}
                    min="1700"
                    max="2024"
                  />
                </div>
                <InputBox label="상세 정보" rows={4} />
              </div>
            </div>

            {/* 카테고리 */}
            <div className="flex flex-row">
              <h2 className="w-[250px] ml-10 text-lg font-bold">카테고리</h2>
              <div className="flex flex-wrap w-96 gap-3">
                {categories.map((category) => (
                  <Button pill size="xs" color="gray"
                          className={`text-line focus:ring-0`}>{category}</Button>
                ))}
              </div>
            </div>

            {/* 완결 여부 */}
            <div className="flex flex-row pb-3">
              <h2 className="w-[250px] ml-10 text-lg font-bold">완결여부</h2>
              <div className="flex gap-3">
                <Button pill size="xs" color="gray"
                        className={`text-line focus:ring-0`}>완결</Button>
                <Button pill size="xs" color="gray"
                        className={`text-line focus:ring-0`}>미완결</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddBook;
