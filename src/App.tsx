import "./App.css";
import { SideBar } from "./components/sideBar/index";
import SimpleBookCard from "./components/SimpleBookCard.tsx";
import SelectChip from "./components/SelectChip.tsx";
import FormButton from "./components/FormButton.tsx";
import SearchBar from "./components/SearchBar.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import AddBook from "./pages/form/AddBook.tsx";
import MainButton from "./components/MainButton.tsx";
import UploadEpisode from "./pages/form/UploadEpisode.tsx";
import UpdateEpisode from "./pages/form/UpdateEpisode.tsx";
import BookDetail from "./pages/book/BookDetail.tsx";
import EpisodeListItem from "./components/EpisodeListItem.tsx";
import ManageMembers from "./pages/ManageMembers.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import Home from "./pages/Home.tsx";

function App() {
  const summary: string =
    "1919년 이 책은 처음에는 헤르만 헤세의 본명이 아닌 이야기의 주인공인 '에밀 싱클레어'라는 필명으로 발표되었다. 제1차 세계 대전 이후 엄청난 비난에 시달려 자신의 이름으로 책을 낼 수 없었기 때문이다. 하지만 데미안이 엄청난 판매량을 기록하고 인기를 어마어마하게 얻게 되자 사람들은 이 엄청난 작품을 뚝딱 만들어낸 듣도 보도 못한 무명의 작가가 누구인지 궁금해했다. 그러다 독자들이 분석을 해 보니 문체가 헤르만 헤세와 유사했던 데다가 신인 문학상까지 덜컥 수상해 버리는 바람에, 결국 헤세는 상을 반납하고 1920년 재판부터 본인의 명의로 발간하며 자신의 작품임을 인정했다.";

  const chapterList = [
    {
      episode: 1,
      subtitle: "두 개의 세계",
    },
    {
      episode: 2,
      subtitle: "카인",
    },
  ];

  return (
    <>
      {/*<BookDetail title="데미안" author="헤르만헤세" summary={summary} chapterList={chapterList} coverImageUrl="/src/assets/book-cover.png" like={617} />*/}
      {/*<AddBook isOpend={true} />*/}
      {/*<UpdateEpisode title="데미안" chapter="chapter1" subtitle="카인" />*/}
      {/*<UploadEpisode title="데미안" />*/}
      {/*<SearchResult />*/}
      {/*<ManageMembers />*/}
      <DashBoard />
    </>
  );
}

export default App;
