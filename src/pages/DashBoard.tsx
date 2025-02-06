import React from 'react';

// project
import {Header} from "../components/header";
import StatsListItem from "../components/StatsListItem.tsx";
import {DisplayType} from '../store/types.tsx';

// css
import {Card} from "flowbite-react";

function DashBoard(): React.JSX.Element {
  return (
    <>
      <Header/>
      <div className="container max-w-5xl mx-auto h-full px-10 mt-14">
        <h1 className="font-extrabold text-2xl flex justify-start mb-6">DASHBOARD</h1>
        <div className="grid gap-y-10 md:gap-x-20 md:grid-cols-2 md:justify-self-center">
          <Card className="md:w-96">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900">조회수 많은순</h5>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.View}
                                                            data={1234} rank={1}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.View}
                                                            data={1234} rank={2}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.View}
                                                            data={1234} rank={3}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.View}
                                                            data={1234} rank={4}/></li>
                <li className="pb-0 pt-3 sm:pt-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.View}
                                                                 data={1234} rank={5}/></li>
              </ul>
            </div>
          </Card>
          <Card className="md:w-96">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900">좋아요 많은순</h5>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Like}
                                                            data={1234} rank={1}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Like}
                                                            data={1234} rank={2}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Like}
                                                            data={1234} rank={3}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Like}
                                                            data={1234} rank={4}/></li>
                <li className="pb-0 pt-3 sm:pt-4"><StatsListItem title="데미안" author="헤르만 헤세"
                                                                 display={DisplayType.Like}
                                                                 data={1234} rank={5}/></li>
              </ul>
            </div>
          </Card>
          <Card className="md:w-96">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900">댓글수 많은순</h5>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Comment}
                                                            data={1234} rank={1}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Comment}
                                                            data={1234} rank={2}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Comment}
                                                            data={1234} rank={3}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Comment}
                                                            data={1234} rank={4}/></li>
                <li className="pb-0 pt-3 sm:pt-4"><StatsListItem title="데미안" author="헤르만 헤세"
                                                                 display={DisplayType.Comment}
                                                                 data={1234} rank={5}/></li>
              </ul>
            </div>
          </Card>
          <Card className="md:w-96">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900">북마크 많은순</h5>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Bookmark}
                                                            data={1234} rank={1}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Bookmark}
                                                            data={1234} rank={2}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Bookmark}
                                                            data={1234} rank={3}/></li>
                <li className="py-3 sm:py-4"><StatsListItem title="데미안" author="헤르만 헤세" display={DisplayType.Bookmark}
                                                            data={1234} rank={4}/></li>
                <li className="pb-0 pt-3 sm:pt-4"><StatsListItem title="데미안" author="헤르만 헤세"
                                                                 display={DisplayType.Bookmark}
                                                                 data={1234} rank={5}/></li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashBoard;