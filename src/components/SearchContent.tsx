import styles from "../styles/SearchContent.module.css";
import { useRef, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface SearchContentProps {
  setAreaState: Dispatch<SetStateAction<string>>;
  fetchDataList: (
    keyword: string,
    page: number,
    newOrNot: boolean
  ) => Promise<void>;
  contTypeState: number;
}

const SearchContent: React.FC<SearchContentProps> = ({
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
  const isMainPage = location.pathname === "/";
  return (
    <div className={styles.searchContent}>
      <select
        className={isMainPage ? styles.selectMain : styles.selectNotMain}
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
        className={isMainPage ? styles.inputMain : styles.inputNotMain}
      ></input>
      <button
        onClick={async () => {
          let keyword = "";
          if (inputRef.current) {
            keyword = inputRef.current.value;
          }
          await fetchDataList(keyword, 1, true);
          if (contTypeState === 15) {
            navigate("/festival");
          } else if (contTypeState === 32) {
            navigate("/lodgment");
          } else if (contTypeState === 12) {
            navigate("/attraction");
          }
        }}
      >
        검색
      </button>
    </div>
  );
};

export default SearchContent;
