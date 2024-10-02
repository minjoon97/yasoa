import styles from "../styles/FestivalListPage.module.css";
import ListItem from "../components/ListItem.tsx";
import SearchContent from "../components/SearchContent.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import {
  festivalCombinedData,
  lodgmentCombinedData,
  attractionCombinedData,
} from "../types/datatype.ts";

interface FestivalListPageProps {
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

const FestivalListPage: React.FC<FestivalListPageProps> = ({
  setAreaState,
  contTypeState,
  fetchedData,
  fetchDataList,
  keywordState,
  setKeywordState,
  areaState,
}) => {
  const [areaViewState, setAreaViewState] = useState("");
  //   const [page, setPage] = useState(1);
  //   let loading = false;

  //   const newLoading = async () => {
  //     if (loading) return;
  //     loading = true;
  //     await fetchDataList("서울", page, false);
  //     loading = false;
  //   };

  //   useEffect(() => {
  //     console.log(page);
  //     newLoading();
  //   }, [page]);

  //   useEffect(() => {
  //     const handleScroll = async () => {
  //       const { scrollTop, scrollHeight, clientHeight } =
  //         document.documentElement;

  //       if (scrollTop + clientHeight >= scrollHeight) {
  //         setPage((page) => page + 1);
  //       }
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.topTitle}>
          <h2>행사</h2>
          <p>Festival</p>
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

export default FestivalListPage;
