import { Dispatch, SetStateAction } from "react";
import styles from "../styles/SearchBox.module.css";
import SearchContent from "./SearchContent.tsx";

interface SearchBoxProps {
  serviceList: string[];
  setcontTypeState: Dispatch<SetStateAction<number>>;
  setAreaState: Dispatch<SetStateAction<string>>;
  fetchDataList: (
    keyword: string,
    page: number,
    newOrNot: boolean
  ) => Promise<void>;
  contTypeState: number;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  serviceList,
  setcontTypeState,
  setAreaState,
  fetchDataList,
  contTypeState,
}) => {
  return (
    <>
      <ul className={`${styles.servicePick}`}>
        {serviceList.map((item, i) => (
          <li
            key={i}
            className={`${styles.servicePickItem}
              ${contTypeState === 15 && i === 0 ? styles.on : ""} 
              ${contTypeState === 32 && i === 1 ? styles.on : ""} 
              ${contTypeState === 12 && i === 2 ? styles.on : ""}`}
            onClick={() => {
              if (item === "행사") {
                setcontTypeState(15);
              } else if (item === "숙소") {
                setcontTypeState(32);
              } else if (item === "관광지") {
                setcontTypeState(12);
              }
            }}
          >
            {item} 검색
          </li>
        ))}
      </ul>
      <SearchContent
        setAreaState={setAreaState}
        fetchDataList={fetchDataList}
        contTypeState={contTypeState}
      ></SearchContent>
    </>
  );
};

export default SearchBox;
