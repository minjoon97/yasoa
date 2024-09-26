import { Route, Routes } from "react-router-dom";
import styles from "./styles/App.module.css";
import "./styles/myreset.css";
import Header from "./components/Header.tsx";
import MainPage from "./pages/MainPage.tsx";
import FestivalListPage from "./pages/FestivalListPage.tsx";
import Footer from "./components/Footer.tsx";
import { useState } from "react";

interface festivalType {
  addr1: string;
  addr2: string;
  areacode: string;
  contentid: string;
  contenttypeid: string;
  firstimage: string;
  firstimage2: string;
  tel: string;
  title: string;
}

function App() {
  const serviceList = ["행사", "숙소", "관광지"];
  const apiKey = `tDjrxG4F1mYPESGwLpGLwG%2BN0xalGoPCacXxUYL2ff%2BmrnaZXK7rDC4RaRwTNfa%2BvIAmyky%2FyAfa%2Bcqm%2B8Qyxw%3D%3D`;
  const [keywordState, setKeywordState] = useState("강원");
  const [contTypeState, setcontTypeState] = useState(15);
  const [areaState, setAreaState] = useState("1");
  const [fetchedData, setfetchedData] = useState<festivalType[]>([]);

  return (
    <div className={styles.wrapper}>
      <Header serviceList={serviceList}></Header>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              serviceList={serviceList}
              apiKey={apiKey}
              keywordState={keywordState}
              setKeywordState={setKeywordState}
              contTypeState={contTypeState}
              setcontTypeState={setcontTypeState}
              areaState={areaState}
              setAreaState={setAreaState}
              fetchedData={fetchedData}
              setfetchedData={setfetchedData}
            ></MainPage>
          }
        ></Route>
        <Route
          path="/festival"
          element={
            <FestivalListPage
              fetchedData={fetchedData}
              apiKey={apiKey}
            ></FestivalListPage>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
