import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// project
import SearchBar from '../components/SearchBar.tsx';
import FormButton from '../components/FormButton.tsx';
import SimpleBookCard from '../components/SimpleBookCard.tsx';
import { CategoryType } from '../store/types.tsx';
import AddBook from './form/AddBook.tsx';
import useSideBarStore from '../store/store.tsx';
/* import get from '../api/api.ts' */
import { novelList } from '../api/mock/novelList.ts';

// css
import { Button, Pagination } from 'flowbite-react';
import { FaBars } from 'react-icons/fa6';

function Home(): React.JSX.Element {
  const toggle = useSideBarStore((state) => state.toggleIsOpened);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const categories: CategoryType[] = Object.values(CategoryType);

  // handler
  const onPageChange = (page: number) => setCurrentPage(page);
  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  // api
  /*const getNovelList = get({ url: 'api/novel/list?page=1&size=10' });*/
  const mockNovelList = novelList.novelList;

  return (
    <>
      {/* logo & search section */}
      <section className="flex flex-col w-full bg-main h-72 justify-center items-center gap-2">
        <div className="absolute top-5 left-8 flex flex-row gap-5">
          <button onClick={toggle}
          ><FaBars size={18} className="fill-button-text" /></button>
          <button className="text-button-text font-medium text-sm">로그아웃</button>
        </div>
        <Link to="/" className="w-1/3 mt-10">
          <img alt='logo' src="src/assets/logo.png" />
        </Link>
        <div className="w-1/2">
          <SearchBar />
        </div>
      </section>

      {/* book list container */}
      <div className="container mx-auto mt-10 max-w-5xl pb-20">
        <div className="flex flex-col w-full divide-y">
          <div className="flex justify-between mb-2">
            <span className="text-xl font-bold">서적목록</span>
            <button onClick={openModal}><FormButton label="새 작품 만들기" /></button>
          </div>
          <div className="flex flex-row gap-2 py-2">
            {categories.map((category: CategoryType, index) => (
                <Button key={index} pill size="xs" color="gray"
                        className={`text-line focus:ring-0`}>{category}</Button>
              ))
            }
          </div>
        </div>
        <div className="grid grid-cols-5 mx-auto mt-5 justify-items-center gap-x-1 gap-y-10">
          {mockNovelList.map((novel) => (
            <Link key={novel.id} to='/book'>
              <SimpleBookCard title={novel.title} author={novel.author} coverImageUrl={novel.coverImageUrl} />
            </Link>
          ))
          }
        </div>

        {/* 페이지 번호 */}
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={10}
            previousLabel=""
            nextLabel=""
            showIcons
          />
        </div>
      </div>

      {/* open modal */}
      {isModalOpened && (
        <div>
          <AddBook isOpened={isModalOpened} onClose={closeModal} />
        </div>
      )}
    </>
  );
}

export default Home;