import styles from "../styles/LodgmentListPage.module.css";
import ListItem from "../components/ListItem.tsx";
import SearchContent from "../components/SearchContent.tsx";
import { Dispatch, SetStateAction } from "react";
import {
  festivalCombinedData,
  lodgmentCombinedData,
  attractionCombinedData,
} from "../types/datatype.ts";

interface LodgmentListPageProps {
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
}

const LodgmentListPage: React.FC<LodgmentListPageProps> = ({
  setAreaState,
  contTypeState,
  fetchedData,
  fetchDataList,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.topTitle}>
          <h2>숙박</h2>
          <p>Lodgment</p>
        </div>
      </div>
      <div className={styles.searchContent}>
        <h3>검색결과는 이렇습니다.</h3>
        <SearchContent
          setAreaState={setAreaState}
          fetchDataList={fetchDataList}
          contTypeState={contTypeState}
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

export default LodgmentListPage;
