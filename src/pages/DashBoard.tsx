import React from 'react';

// project
import {Header} from "../components/header";
import StatsListItem from "../components/StatsListItem.tsx";

// css
import {Card} from "flowbite-react";

function DashBoard(): React.JSX.Element {
    return (
        <>
            <Header/>
            <div className="container mx-auto mt-14">
                <div className="grid grid-cols-2 gap-y-10 place-items-stretch">
                    <Card className="max-w-sm mx-auto">
                        <div className="mb-4 flex items-center justify-between">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">조회수 많은순</h5>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display="view"
                                                                            data={1234} rank={1}/></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="pb-0 pt-3 sm:pt-4"></li>
                            </ul>
                        </div>
                    </Card>
                    <Card className="max-w-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">좋아요 많은순</h5>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display="view"
                                                                            data={1234} rank={1}/></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="pb-0 pt-3 sm:pt-4"></li>
                            </ul>
                        </div>
                    </Card>
                    <Card className="max-w-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">댓글 많은순</h5>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display="view"
                                                                            data={1234} rank={1}/></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="pb-0 pt-3 sm:pt-4"></li>
                            </ul>
                        </div>
                    </Card>
                    <Card className="max-w-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">북마크 많은순</h5>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display="view"
                                                                            data={1234} rank={1}/></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="py-3 sm:py-4"></li>
                                <li className="pb-0 pt-3 sm:pt-4"></li>
                            </ul>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default DashBoard;