import styles from "../styles/AttractionListPage.module.css";
import ListItem from "../components/ListItem.tsx";
import SearchContent from "../components/SearchContent.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import {
  festivalCombinedData,
  lodgmentCombinedData,
  attractionCombinedData,
} from "../types/datatype.ts";

interface AttractionListPageProps {
  setAreaState: Dispatch<SetStateAction<string>>;
  contTypeState: number;
  fetchedData:
    | festivalCombinedData[]
    | lodgmentCombinedData[]
    | attractionCombinedData[];
  fetchDataList: (
    keyword: string,
    page: number,
    newOrNot: boolean
  ) => Promise<void>;
  keywordState: string;
  setKeywordState: Dispatch<SetStateAction<string>>;
  areaState: string;
}

const AttractionListPage: React.FC<AttractionListPageProps> = ({
  setAreaState,
  contTypeState,
  fetchedData,
  fetchDataList,
  keywordState,
  setKeywordState,
  areaState,
}) => {
  const [areaViewState, setAreaViewState] = useState("");
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.topTitle}>
          <h2>관광지</h2>
          <p>Attraction</p>
        </div>
      </div>
      <div className={styles.searchContentBox}>
        <h3>
          <span>{areaViewState}</span>의 <span>{keywordState}</span>에 대한
          검색결과 입니다.
        </h3>
        <SearchContent
          areaState={areaState}
          setAreaState={setAreaState}
          fetchDataList={fetchDataList}
          contTypeState={contTypeState}
          keywordState={keywordState}
          setKeywordState={setKeywordState}
          areaViewState={areaViewState}
          setAreaViewState={setAreaViewState}
        ></SearchContent>
      </div>
      <div className={styles.listContent}>
        <ul>
          {fetchedData?.map((item, i) => (
            <ListItem key={i} item={item}></ListItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttractionListPage;
