import React, {useEffect, useState} from "react";

// project
import SearchBar from "../components/SearchBar.tsx";
import {Header} from "../components/header";
import SimpleBookCard from "../components/SimpleBookCard.tsx";
import { get } from '../api/api.ts';
import { SearchNovelData } from '../store/novelDetailInterface.ts';

// css
import {Button} from "flowbite-react";
import { useSearchParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

type SortType = "latest" | "alphabetical";

function SearchResult(): React.JSX.Element {
    /* 배경색 변경 */
    useEffect(() => {
        const root = document.getElementById('root');
        if (root) {
            root.style.width = '100%';
            root.style.height = '100%';
            root.style.background = '#FFFAEB';
        }
        return () => {
            if (root) {
                root.style.width = '';
                root.style.height = '';
            }
        }
    }, []);

    const [sortOrder, setSortOrder] = useState<SortType>("latest");
    const [searchParam] = useSearchParams();
    const query = searchParam.get('query') || '';
    const [results, setResults] = useState<SearchNovelData[]>();
    // TODO: 검색 결과 페이지에 무한 스크롤 또는 페이지네이션 적용
    // const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const url = `api/admin/novels/search?query=${query}&page=1&size=20`
        const fetchResults = async () => {
            try {
                const res: AxiosResponse = await get({ url: url });
                setResults(res.data.novelList);
            } catch (err) {
                console.error(err);
            }
        }
        fetchResults();
    // TODO: 의존성에 current page 추가
    }, [query]);

    return (
        <>
            <Header/>
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="w-1/2 mt-8"><SearchBar/></div>
                <section className="mt-14 bg-white rounded-normal-radius h-dvh divide-y">
                    <div className="px-4 py-2 justify-self-end flex flex-row gap-2">
                        <Button pill size="xs" color="gray"
                                onClick={() => setSortOrder("latest")}
                                className={`text-line focus:ring-0 ${sortOrder === 'latest' ? 'text-button border-button' : null}`}>최신순</Button>
                        <Button pill size="xs" color="gray"
                                onClick={() => setSortOrder("alphabetical")}
                                className={`text-line focus:ring-0 ${sortOrder === 'alphabetical' ? 'text-button border-button' : null}`}>가나다순</Button>
                    </div>
                    <div className="grid grid-cols-5  gap-x-8 gap-y-10 py-8 px-16">
                        {results &&
                          results.map((novel) => (
                          <SimpleBookCard title={novel.title}
                                          author={novel.authorList.join(', ')}
                                          coverImageUrl={novel.coverImageUrl}
                          />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default SearchResult;