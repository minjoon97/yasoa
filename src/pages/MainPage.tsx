import SearchBox from "../components/SearchBox.tsx";
import HotArea from "../components/HotArea.tsx";
import styles from "../styles/MainPage.module.css";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

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

interface MainPageProps {
  serviceList: string[];
  apiKey: string;
  keywordState: string;
  setKeywordState: Dispatch<SetStateAction<string>>;
  contTypeState: number;
  setcontTypeState: Dispatch<SetStateAction<number>>;
  areaState: string;
  setAreaState: Dispatch<SetStateAction<string>>;
  fetchedData: festivalType[];
  setfetchedData: Dispatch<SetStateAction<festivalType[]>>;
}

const MainPage: React.FC<MainPageProps> = ({
  serviceList,
  apiKey,
  keywordState,
  setKeywordState,
  contTypeState,
  setcontTypeState,
  areaState,
  setAreaState,
  fetchedData,
  setfetchedData,
}) => {
  const famousArea = ["서울", "여수", "부산", "속초", "강릉", "제주도"];

  const keywordSearchUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${apiKey}&numOfRows=4&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${keywordState}&contentTypeId=${contTypeState}&areaCode=${areaState}`;

  const fetchDataList = useCallback(async () => {
    const res = await fetch(keywordSearchUrl);
    const fetchedResult = await res.json();
    setfetchedData(fetchedResult.response.body.items.item);
  }, [keywordSearchUrl]);

  useEffect(() => {
    console.log(keywordState, contTypeState, areaState);
    console.log(fetchedData);
  }, [fetchedData]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.sec01}>
        <div className={styles.sec01Contents}>
          <h2 className={styles.sec01Title}>
            찾고싶은 행사, 숙소, 관광지를
            <br /> 검색해보세요.
          </h2>
          <SearchBox
            serviceList={serviceList}
            setKeywordState={setKeywordState}
            setcontTypeState={setcontTypeState}
            setAreaState={setAreaState}
            fetchDataList={fetchDataList}
            contTypeState={contTypeState}
          ></SearchBox>
        </div>
      </section>
      <section className={styles.sec02}>
        <div className={styles.sec01Contents}>
          <h2 className={styles.sec02Title}>
            인기있는 지역의 행사를 확인해보세요!
          </h2>
          <ul className={styles.hotAreaWrapper}>
            {famousArea.map((item, i) => (
              <HotArea key={i} item={item}></HotArea>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
