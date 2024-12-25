import React, { useCallback, useRef, useState } from 'react';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { debounce } from 'lodash';

// project
import MainButton from '../../components/MainButton';
import InputBox from '../../components/InputBox';
import { CategoryType } from '../../store/types.tsx';
import { post, putPresignedUrl } from '../../api/api.ts';

// css
import { AiOutlineUpload, AiOutlinePlus } from 'react-icons/ai';
import { Button } from 'flowbite-react';

type AddBookProps = {
  isOpened: boolean;
  onClose: () => void;
};

function AddBook({ isOpened, onClose }: AddBookProps): React.JSX.Element | null {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    summary: '',
    publicationYear: '',
    category: [] as string[],
    isCompleted: false,
  });

  const putFileHeaders = {
    'Content-Type': 'image/jpeg',
  } as AxiosRequestHeaders;
  const categories: string[] = Object.values(CategoryType);

  // handler
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCategoryClick = (category: string): void => {
    setBookData((prev) => {
      const updatedCategories = prev.category.includes(category)
        ? prev.category.filter((cat) => cat !== category)
        : [...prev.category, category];
      return { ...prev, category: updatedCategories };
    });
  };

  // api
  const debouncedSubmit = useCallback(
    debounce(async (bookData) => {
      try {
        const res: AxiosResponse = await post({ url: 'api/admin/novel', data: bookData });
        const presignedUrl: string = res.data.data.presignedUrl;
        if (file && presignedUrl) {
          await putPresignedUrl({ url: presignedUrl, data: file, headers: putFileHeaders });
        }
        alert('새 소설 생성 완료!');
        onClose();
        window.location.reload();
      } catch (error) {
        console.error('Error creating presignedURL:', error);
      }
    }, 500), [bookData, file, onClose],
  );

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    debouncedSubmit(bookData);
  };

  return (
    <>
      {isOpened && (
        <div className='fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5 bg-white w-[900px] p-6 rounded-md shadow-lg'>
              {/* 저장 & 닫기 버튼 */}
              <div className='fixed flex self-end gap-3'>
                <button type='submit'><MainButton className='w-14' label='저장' /></button>
                <button
                  onClick={onClose}
                ><MainButton className='w-14 bg-gray-400' label='닫기' /></button>
              </div>

              {/* 표지 등록 */}
              <div className='flex flex-row pt-8'>
                <h2 className='w-[250px] ml-10 text-lg font-bold'>표지 등록</h2>
                <span
                  className='flex flex-col justify-center items-center rounded-normal-radius w-28 h-32 bg-background hover:bg-gray-200 hover:cursor-pointer'
                  onClick={handleUploadClick}>
                  {preview ? (
                    <img src={preview} alt='미리보기' className='object-cover w-full h-full rounded-md' />
                  ) : (
                    <AiOutlineUpload size={40} />
                  )}
                </span>
                {fileName && (<p className='px-3 py-1 text-xs self-end'>{fileName}</p>)}
                <input
                  type='file'
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept='image/*'
                />
              </div>

              {/* 도서 정보 */}
              <div className='flex flex-row'>
                <h2 className='w-[250px] ml-10 text-lg font-bold'>도서 정보</h2>
                <div className='flex flex-col gap-2.5 w-96'>
                  <InputBox label='책 제목' name='title' onChange={handleInputChange} />
                  <div className='flex items-end'>
                    <InputBox label='저자' name='author' onChange={handleInputChange} />
                    <button className='w-10'>
                      <AiOutlinePlus className='fill-button-text mx-2 mb-2' />
                    </button>
                  </div>
                  <div className={`flex flex-col items-start`}>
                    <label htmlFor='label'
                           className='block ml-1 mb-1 text-xs font-medium text-line'>출판년도</label>
                    <input
                      type='number'
                      className={`border border-line border-opacity-20 text-sm rounded-lg block w-full px-0.5 py-1.5 focus:ring-blue-100`}
                      min='1700'
                      max='2024'
                      name='publicationYear'
                      onChange={handleInputChange}
                    />
                  </div>
                  <InputBox label='줄거리' name='summary' rows={4} onChange={handleInputChange} />
                </div>
              </div>

              {/* 카테고리 */}
              <div className='flex flex-row'>
                <h2 className='w-[250px] ml-10 text-lg font-bold'>카테고리</h2>
                <div className='flex flex-wrap w-96 gap-3'>
                  {categories.map((category) => (
                    <Button pill size='xs'
                            key={category} name='category'
                            onClick={() => handleCategoryClick(category)}
                            className={`focus:ring-0 ${bookData.category.includes(category) ? 'text-button border border-button' : 'text-line border border-gray-200'}`}>{category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 완결 여부 */}
              <div className='flex flex-row pb-3'>
                <h2 className='w-[250px] ml-10 text-lg font-bold'>완결여부</h2>
                <div className='flex gap-3'>
                  <Button pill size='xs' color='gray' name='isCompleted'
                          onClick={() => setBookData((prev) => ({ ...prev, isCompleted: true }))}
                          className={`focus:ring-0 ${bookData.isCompleted ? 'text-button border border-button' : 'text-line border border-gray-200'}`}>완결</Button>
                  <Button pill size='xs' color='gray' name='isCompleted'
                          onClick={() => setBookData((prev) => ({ ...prev, isCompleted: false }))}
                          className={`focus:ring-0 ${!bookData.isCompleted ? 'text-button border border-button' : 'text-line border border-gray-200'}`}>미완결</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddBook;
