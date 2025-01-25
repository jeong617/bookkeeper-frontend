import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AxiosRequestHeaders, AxiosResponse} from 'axios';
import {debounce} from 'lodash';

// project
import MainButton from '../../components/MainButton';
import InputBox from '../../components/InputBox';
import {CategoryType} from '../../store/types.tsx';
import {post, putPresignedUrl} from '../../api/api.ts';

// css
import {AiOutlineUpload, AiOutlinePlus} from 'react-icons/ai';
import {Button} from 'flowbite-react';
import {NovelDetailData} from '../../store/novelDetailInterface.ts';
import {useLayoutStore} from '../../store/store.tsx';

type AddBookProps = {
  isOpened: boolean;
  onClose: () => void;
  prevNovelInfo?: NovelDetailData;
};

function AddBook({isOpened, onClose, prevNovelInfo}: AddBookProps): React.JSX.Element | null {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(prevNovelInfo?.coverImageUrl || null);
  const [bookData, setBookData] = useState({
    title: prevNovelInfo?.title || '',
    author: prevNovelInfo?.authorList.join(',') || '',
    summary: prevNovelInfo?.summary || '',
    publicationYear: prevNovelInfo?.publicationYear || '',
    categoryList: prevNovelInfo?.categoryList || [] as string[],
    isCompleted: prevNovelInfo?.isCompleted || false,
  });
  const { isMobile, setIsMobile } = useLayoutStore();

  const putFileHeaders = {
    'Content-Type': 'image/jpeg',
  } as AxiosRequestHeaders;
  const categories: string[] = Object.values(CategoryType);

  // handler
  const handleBackgroundClick = () => {
    if (!isMobile) {
      onClose();
    }
  };
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
    const {name, value} = e.target;
    setBookData((prev) => ({...prev, [name]: value}));
  };
  const handleCategoryClick = (category: string): void => {
    setBookData((prev) => {
      const updatedCategories = prev.categoryList.includes(category)
        ? prev.categoryList.filter((cat) => cat !== category)
        : [...prev.categoryList, category];
      return {...prev, categoryList: updatedCategories};
    });
  };
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    debouncedSubmit(bookData);
  };

  // api
  const debouncedSubmit = useCallback(
    debounce(async (bookData) => {
      try {
        const res: AxiosResponse = await post({url: 'api/admin/novel', data: bookData});
        const presignedUrl: string = res.data.data.presignedUrl;
        if (file && presignedUrl) {
          await putPresignedUrl({url: presignedUrl, data: file, headers: putFileHeaders});
        }
        alert('새 소설 생성 완료!');
        onClose();
        window.location.reload();
      } catch (error) {
        console.error('Error creating presignedURL:', error);
      }
    }, 500), [bookData, file, onClose],
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpened) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpened, onClose]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  return (
    <>
      {isOpened && (
        <>
          <div className='fixed z-30 inset-0 flex bg-white justify-center md:items-center md:bg-black md:bg-opacity-20'
               onClick={handleBackgroundClick}
          >
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-5 bg-white w-full px-1 py-6 rounded-md md:w-[50rem] md:px-16 md:shadow-lg'
                   onClick={(e) => e.stopPropagation()}
              >
                {/* Desktop 저장 & 닫기 버튼 */}
                <div className='hidden fixed self-end gap-3 md:flex'>
                  <button type='submit'><MainButton className='w-14' label='저장'/></button>
                  <button
                    onClick={onClose}
                  ><MainButton className='w-14 bg-gray-400' label='닫기'/></button>
                </div>

                {/* 표지 등록 */}
                <div className='md:pt-8 md:flex'>
                  <h2 className='mb-2 text-lg font-bold md:w-1/3 md:mb-0'>표지 등록</h2>
                  <div className="place-self-center md:w-2/3">
                    <span
                      className='flex flex-col justify-center items-center rounded-normal-radius w-28 h-32 bg-background hover:bg-gray-200 hover:cursor-pointer'
                      onClick={handleUploadClick}>
                      {preview ? (
                        <img src={preview} alt='미리보기' className='object-cover w-full h-full rounded-md'/>
                      ) : (
                        <AiOutlineUpload size={40}/>
                      )}
                    </span>
                    {fileName && (<p className='px-3 py-1 text-xs self-end'>{fileName}</p>)}
                    <input
                      type='file'
                      ref={fileInputRef}
                      style={{display: 'none'}}
                      onChange={handleFileChange}
                      accept='image/*'
                    />
                  </div>
                </div>

                {/* 도서 정보 */}
                <div className='md:flex'>
                  <h2 className='w-1/3 text-lg font-bold mb-2 md:mb-0'>도서 정보</h2>
                  <div className='flex flex-col gap-2.5 md:w-2/3'>
                    <InputBox label='책 제목' name='title' onChange={handleInputChange} value={bookData.title}/>
                    <div className='flex items-end'>
                      <InputBox label='저자' name='author' onChange={handleInputChange} value={bookData.author}/>
                      <button className='w-10'>
                        <AiOutlinePlus className='fill-button-text mx-2 mb-2'/>
                      </button>
                    </div>
                    <div className={`flex flex-col items-start`}>
                      <label htmlFor='label'
                             className='block ml-1 mb-1 text-xs font-medium text-line'>출판년도</label>
                      <input
                        type='number'
                        className={`border border-line border-opacity-20 text-sm rounded-lg block w-full px-0.5 py-1.5 focus:ring-blue-100`}
                        min='1'
                        max='2024'
                        name='publicationYear'
                        defaultValue={bookData.publicationYear}
                        onChange={handleInputChange}
                      />
                    </div>
                    <InputBox label='줄거리' name='summary' rows={4} onChange={handleInputChange}
                              value={bookData.summary}/>
                  </div>
                </div>

                {/* 카테고리 */}
                <div className='md:flex'>
                  <h2 className='w-1/3 text-lg font-bold mb-2 md:mb-0'>카테고리</h2>
                  <div className='flex flex-wrap gap-x-3 gap-y-1 md:w-2/3'>
                    {categories.map((category) => (
                      <Button pill size='xs'
                              key={category} name='category'
                              onClick={() => handleCategoryClick(category)}
                              className={`focus:ring-0 ${bookData.categoryList.includes(category) ? 'text-button border border-button' : 'text-line border border-gray-200'}`}>{category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 완결 여부 */}
                <div className='md:flex pb-3'>
                  <h2 className='w-1/3 text-lg font-bold mb-2 md:mb-0'>완결여부</h2>
                  <div className='flex self-start gap-3'>
                    <Button pill size='xs' color='gray' name='isCompleted'
                            onClick={() => setBookData((prev) => ({...prev, isCompleted: true}))}
                            className={`focus:ring-0 ${bookData.isCompleted ? 'text-button border border-button' : 'text-line border border-gray-200'}`}>완결</Button>
                    <Button pill size='xs' color='gray' name='isCompleted'
                            onClick={() => setBookData((prev) => ({...prev, isCompleted: false}))}
                            className={`focus:ring-0 ${!bookData.isCompleted ? 'text-button border border-button' : 'text-line border border-gray-200'}`}>미완결</Button>
                  </div>
                </div>

                {/* Mobile 저장 & 닫기 버튼 */}
                <div className='place-self-center md:hidden'>
                  <button type='submit'><MainButton className='w-14 mx-1' label='저장'/></button>
                  <button
                    onClick={onClose}
                  ><MainButton className='w-14 bg-gray-400 mx-1' label='닫기'/></button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
export default AddBook;
