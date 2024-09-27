import SearchBox from "../components/SearchBox.tsx";
import HotArea from "../components/HotArea.tsx";
import styles from "../styles/MainPage.module.css";
import { Dispatch, SetStateAction } from "react";

interface MainPageProps {
  serviceList: string[];
  contTypeState: number;
  setcontTypeState: Dispatch<SetStateAction<number>>;
  setAreaState: Dispatch<SetStateAction<string>>;
  fetchDataList: (keyword: string) => Promise<void>;
}

const MainPage: React.FC<MainPageProps> = ({
  serviceList,
  contTypeState,
  setcontTypeState,
  setAreaState,
  fetchDataList,
}) => {
  const famousArea = ["서울", "여수", "부산", "속초", "강릉", "제주도"];

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
