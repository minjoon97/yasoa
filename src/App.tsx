import { Route, Routes } from "react-router-dom";
import styles from "./styles/App.module.css";
import "./styles/myreset.css";
import Header from "./components/Header.tsx";
import MainPage from "./pages/MainPage.tsx";
import FestivalListPage from "./pages/FestivalListPage.tsx";
import LodgmentListPage from "./pages/LodgmentListPage.tsx";
import AttractionListPage from "./pages/AttractionListPage.tsx";
import Footer from "./components/Footer.tsx";
import { useState, useEffect } from "react";
import {
  keywordSearchType,
  festivalCombinedData,
  lodgmentCombinedData,
  attractionCombinedData,
} from "./types/datatype.ts";

function App() {
  const serviceList = ["행사", "숙소", "관광지"];
  // const apiKey = `tDjrxG4F1mYPESGwLpGLwG%2BN0xalGoPCacXxUYL2ff%2BmrnaZXK7rDC4RaRwTNfa%2BvIAmyky%2FyAfa%2Bcqm%2B8Qyxw%3D%3D`;
  const apiKey = `1ts3mNgdR2GA9%2FGG1SH%2FJir1t4ZSyoX2I4FSCTqa9TG175iARI1Vz1a9BOpiz4qrU%2Fp8XJ94PBmW7h7jbJdi%2BQ%3D%3D`;
  const [contTypeState, setcontTypeState] = useState(15);
  const [areaState, setAreaState] = useState("1");
  const [fetchedData, setfetchedData] = useState<
    festivalCombinedData[] | lodgmentCombinedData[] | attractionCombinedData[]
  >([]);

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
  const fetchCommonList = async (item: keywordSearchType) => {
    const commonUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${item.contentid}&contentTypeId=${contTypeState}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=1&pageNo=1`;
    const res = await fetch(commonUrl);
    const fetchedCommonResult = await res.json();
    return fetchedCommonResult;
  };

  //introApi가져오기
  const fetchIntroList = async (item: keywordSearchType) => {
    const introUrl = `https://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${item.contentid}&contentTypeId=${contTypeState}&numOfRows=1&pageNo=1`;
    const res = await fetch(introUrl);
    const fetchedIntroResult = await res.json();
    return fetchedIntroResult;
  };

  const fetchDataList = async (
    keyword: string,
    page: number,
    newOrNot: boolean
  ) => {
    const keywordSearchUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${apiKey}&numOfRows=6&pageNo=${page}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${keyword}&contentTypeId=${contTypeState}&areaCode=${areaState}`;
    const res = await fetch(keywordSearchUrl);
    const fetchedResult = await res.json();
    const fetchedItems = fetchedResult.response.body.items.item;
    const combinedData:
      | festivalCombinedData[]
      | lodgmentCombinedData[]
      | attractionCombinedData[] = [];

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

    if (newOrNot) {
      localStorage.setItem("fetchedData", JSON.stringify(combinedData));
    } else {
      const savedData = localStorage.getItem("fetchedData");
      const newFetchedData = [
        ...(savedData ? JSON.parse(savedData) : []),
        ...combinedData,
      ];
      localStorage.setItem("fetchedData", JSON.stringify(newFetchedData));
      setfetchedData(newFetchedData);
    }
  };

  useEffect(() => {
    console.log(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    const savedData = localStorage.getItem("fetchedData");
    if (savedData) {
      setfetchedData(JSON.parse(savedData));
    }
  }, []);

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
            <FestivalListPage
              setAreaState={setAreaState}
              contTypeState={contTypeState}
              fetchedData={fetchedData}
              fetchDataList={fetchDataList}
            ></FestivalListPage>
          }
        ></Route>
        <Route
          path="/lodgment"
          element={
            <LodgmentListPage
              setAreaState={setAreaState}
              contTypeState={contTypeState}
              fetchedData={fetchedData}
              fetchDataList={fetchDataList}
            ></LodgmentListPage>
          }
        ></Route>
        <Route
          path="/attraction"
          element={
            <AttractionListPage
              setAreaState={setAreaState}
              contTypeState={contTypeState}
              fetchedData={fetchedData}
              fetchDataList={fetchDataList}
            ></AttractionListPage>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
