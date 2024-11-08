import React, {useEffect, useState} from "react";

// project
import SearchBar from "../components/SearchBar.tsx";
import {Header} from "../components/header";
import SimpleBookCard from "../components/SimpleBookCard.tsx";

// css
import {Button} from "flowbite-react";

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
                        <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설"
                                        coverImageUrl="/src/assets/book-cover/데미안.png"/>
                        <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설"
                                        coverImageUrl="/src/assets/book-cover/데미안.png"/>
                        <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설"
                                        coverImageUrl="/src/assets/book-cover/데미안.png"/>
                    </div>
                </section>
            </div>
        </>
    );
}

export default SearchResult;