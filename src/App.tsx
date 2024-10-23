import './App.css'
import { SideBar } from "./components/sideBar/index";
import SimpleBookCard from "./components/SimpleBookCard.tsx";
import SelectChip from "./components/SelectChip.tsx";
import FormButton from "./components/FormButton.tsx";
import SearchBar from "./components/SearchBar.tsx";


function App() {

  return (
    <>
      {/*<SimpleBookCard title="데미안" author="헤르만 헤세" category="고전소설" coverImageUrl="src/assets/book-cover.png" />
      <SelectChip value="전체" isActivated={true} />
      <SelectChip value="전체" isActivated={false} />
      <FormButton label="새 작품 만들기" />*/}
      <SearchBar />
    </>
  )
}

export default App
