import React from 'react';

// project
import {Header} from "../components/header";
import SearchBar from "../components/SearchBar.tsx";
import FormButton from "../components/FormButton.tsx";
import SimpleBookCard from "../components/SimpleBookCard.tsx";

// css
import {Button} from "flowbite-react";
import {FaBars} from "react-icons/fa6";

function Home(): React.JSX.Element {
    return (
        <>
            {/* logo & search section */}
            <section className="flex flex-col w-full bg-main h-72 justify-center items-center gap-2">
                <div className="absolute top-5 left-8 flex flex-row gap-5">
                    <button><FaBars size={18} className="fill-button-text" /></button>
                    <button className="text-button-text font-medium text-sm">로그아웃</button>
                </div>
                <img src="src/assets/logo.png"
                     className="w-1/3 mt-10"
                />
                <div className="w-1/2">
                    <SearchBar/>
                </div>
            </section>

            {/* book list container */}
            <div className="container mx-auto mt-10 max-w-5xl pb-20">
                <div className="flex flex-col w-full divide-y">
                    <div className="flex justify-between mb-2">
                        <span className="text-xl font-bold">서적목록</span>
                        <FormButton label="새 작품 만들기"/>
                    </div>
                    <div className="flex flex-row gap-2 py-2">
                        <Button pill size="xs" color="gray"
                                className={`text-line focus:ring-0`}>전체</Button>
                        <Button pill size="xs" color="gray"
                                className={`text-line focus:ring-0`}>고전소설</Button>
                        <Button pill size="xs" color="gray"
                                className={`text-line focus:ring-0`}>판타지</Button>
                        <Button pill size="xs" color="gray"
                                className={`text-line focus:ring-0`}>무협</Button>
                        <Button pill size="xs" color="gray"
                                className={`text-line focus:ring-0`}>로맨스</Button>
                        <Button pill size="xs" color="gray"
                                className={`text-line focus:ring-0`}>코미디</Button>
                        <Button pill size="xs" color="gray"
                                className={`text-line focus:ring-0`}>라이트노벨</Button>
                        <Button pill size="xs" color="gray"
                                className={`text-line focus:ring-0`}>추리</Button>
                        <Button pill size="xs" color="gray"
                                className={`text-line focus:ring-0`}>미스테리</Button>
                    </div>
                </div>
                <div className="grid grid-cols-5 mx-auto mt-5 justify-items-center gap-x-1 gap-y-10">
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                    <SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
                </div>

            </div>
        </>
    )
}

export default Home;