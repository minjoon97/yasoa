import { Dispatch, SetStateAction, useRef } from "react";
import styles from "../styles/SearchBox.module.css";
import { useNavigate } from "react-router-dom";

interface SearchBoxProps {
  serviceList: string[];
  setcontTypeState: Dispatch<SetStateAction<number>>;
  setAreaState: Dispatch<SetStateAction<string>>;
  fetchDataList: (keyword: string) => Promise<void>;
  contTypeState: number;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  serviceList,
  setcontTypeState,
  setAreaState,
  fetchDataList,
  contTypeState,
}) => {
  const areaCode = {
    서울: 1,
    인천: 2,
    대전: 3,
    대구: 4,
    광주: 5,
    부산: 6,
    울산: 7,
    세종: 8,
    경기도: 31,
    강원도: 32,
    충청북도: 33,
    충청남도: 34,
    경상북도: 35,
    경상남도: 46,
    전라북도: 37,
    전라남도: 38,
    제주도: 39,
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
      <div className={styles.searchContent}>
        <select
          onChange={(e) => {
            setAreaState(e.target.value);
          }}
        >
          {Object.entries(areaCode).map(([key, value]) => (
            <option key={value} value={value}>
              {key}
            </option>
          ))}
        </select>
        <input
          ref={inputRef}
          type="text"
          placeholder="검색하고자 하는 키워드를 입력해주세요"
        ></input>
        <button
          onClick={() => {
            let keyword = "";
            if (inputRef.current) {
              keyword = inputRef.current.value;
            }
            fetchDataList(keyword);
            if (contTypeState === 15) {
              navigate("/festival");
            }
          }}
        >
          검색
        </button>
      </div>
    </>
  );
};

export default SearchBox;
