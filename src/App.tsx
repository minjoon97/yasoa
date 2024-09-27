import { Route, Routes } from "react-router-dom";
import styles from "./styles/App.module.css";
import "./styles/myreset.css";
import Header from "./components/Header.tsx";
import MainPage from "./pages/MainPage.tsx";
import FestivalListPage from "./pages/FestivalListPage.tsx";
import Footer from "./components/Footer.tsx";
import { useState, useEffect } from "react";

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

interface festivalCombinedData extends festivalType {
  commonData: {
    title: string;
    tel: string;
    homepage: string;
    firstimage: string;
    firstimage2: string;
    overview: string;
  };
  introData: {
    sponsor1: string;
    sponsor1tel: string;
    eventstartdate: string;
    eventenddate: string;
    eventplace: string;
    usetimefestival: string;
  };
}

function App() {
  const serviceList = ["행사", "숙소", "관광지"];
  const apiKey = `tDjrxG4F1mYPESGwLpGLwG%2BN0xalGoPCacXxUYL2ff%2BmrnaZXK7rDC4RaRwTNfa%2BvIAmyky%2FyAfa%2Bcqm%2B8Qyxw%3D%3D`;
  const [contTypeState, setcontTypeState] = useState(15);
  const [areaState, setAreaState] = useState("1");
  const [fetchedData, setfetchedData] = useState<festivalCombinedData[]>([]);

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload(); // 페이지 새로고침
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  //commonApi가져오기
  const fetchCommonList = async (item: festivalType) => {
    const commonUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${item.contentid}&contentTypeId=15&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1`;
    const res = await fetch(commonUrl);
    const fetchedCommonResult = await res.json();
    return fetchedCommonResult;
  };

  //introApi가져오기
  const fetchIntroList = async (item: festivalType) => {
    const introUrl = `https://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${item.contentid}&contentTypeId=15&numOfRows=10&pageNo=1`;
    const res = await fetch(introUrl);
    const fetchedIntroResult = await res.json();
    return fetchedIntroResult;
  };

  const fetchDataList = async (keyword: string) => {
    const keywordSearchUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${apiKey}&numOfRows=4&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${keyword}&contentTypeId=${contTypeState}&areaCode=${areaState}`;
    const res = await fetch(keywordSearchUrl);
    const fetchedResult = await res.json();
    const fetchedItems = fetchedResult.response.body.items.item;
    const combinedData: festivalCombinedData[] = [];

    for (const item of fetchedItems) {
      const commonData = await fetchCommonList(item);
      const introData = await fetchIntroList(item);

      const mergedData = {
        ...item,
        commonData: commonData.response.body.items.item[0],
        introData: introData.response.body.items.item[0],
      };

      combinedData.push(mergedData);
    }
    setfetchedData(combinedData);
  };

  useEffect(() => {
    console.log(fetchedData);
  }, [fetchedData]);

  return (
    <div className={styles.wrapper}>
      <Header serviceList={serviceList}></Header>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              serviceList={serviceList}
              contTypeState={contTypeState}
              setcontTypeState={setcontTypeState}
              setAreaState={setAreaState}
              fetchDataList={fetchDataList}
            ></MainPage>
          }
        ></Route>
        <Route
          path="/festival"
          element={
            <FestivalListPage fetchedData={fetchedData}></FestivalListPage>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
