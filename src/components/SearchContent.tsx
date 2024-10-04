import styles from "../styles/SearchContent.module.css";
import { useRef, Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SearchContentProps {
  areaState?: string;
  setAreaState: Dispatch<SetStateAction<string>>;
  fetchDataList: (
    keyword: string,
    page: number,
    newOrNot: boolean
  ) => Promise<void>;
  contTypeState: number;
  keywordState: string;
  setKeywordState: Dispatch<SetStateAction<string>>;
  areaViewState?: string;
  setAreaViewState?: Dispatch<SetStateAction<string>>;
}

const SearchContent: React.FC<SearchContentProps> = ({
  areaState,
  setAreaState,
  fetchDataList,
  contTypeState,
  keywordState,
  setKeywordState,
  setAreaViewState,
}) => {
  const areaCode: Record<string, number> = {
    서울특별시: 1,
    인천광역시: 2,
    대전광역시: 3,
    대구광역시: 4,
    광주광역시: 5,
    부산광역시: 6,
    울산광역시: 7,
    세종특별시: 8,
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

  const isInitialMount = useRef(true);

  useEffect(() => {
    console.log(areaState, contTypeState, keywordState);
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // keywordState가 빈 문자열이 아닌 경우에만 실행
      if (keywordState.trim() !== "") {
        if (setAreaViewState) {
          setAreaViewState(() => {
            const areaNumber = areaState;
            const areaName = Object.keys(areaCode).find(
              (key) => areaCode[key] === Number(areaNumber)
            );

            return areaName || "";
          });
        }
        fetchDataList(keywordState, 1, true);

        if (contTypeState === 15) {
          navigate("/festival");
        } else if (contTypeState === 32) {
          navigate("/lodgment");
        } else if (contTypeState === 12) {
          navigate("/attraction");
        }
      } else {
        console.log("검색어가 빈 문자열입니다.");
      }
    }
  }, [keywordState]);

  return (
    <div className={styles.searchContent}>
      <select
        className={isMainPage ? styles.selectMain : styles.selectNotMain}
        value={areaState}
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
        className={isMainPage ? styles.searchBtnMain : styles.searchBtnNotMain}
        onClick={async () => {
          if (inputRef.current && inputRef.current.value.trim() !== "") {
            setKeywordState(inputRef.current.value);
            inputRef.current.value = "";
          }
        }}
      >
        검색
      </button>
    </div>
  );
};

export default SearchContent;
