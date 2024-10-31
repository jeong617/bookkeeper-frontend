import './App.css'
import { SideBar } from "./components/sideBar/index";
import SimpleBookCard from "./components/SimpleBookCard.tsx";
import SelectChip from "./components/SelectChip.tsx";
import FormButton from "./components/FormButton.tsx";
import SearchBar from "./components/SearchBar.tsx";
import HomePage from "./pages/home/HomePage.tsx"
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
    const chapterList = [
        {
            episode: 1,
            subtitle: "두 개의 세계"
        },
        {
            episode: 2,
            subtitle: "카인"
        }
    ]

  return (
    <>
        <Home />
    </>
  )
}

export default App
