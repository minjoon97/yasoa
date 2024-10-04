import { Dispatch, SetStateAction } from "react";
import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import {
  festivalCombinedData,
  lodgmentCombinedData,
  attractionCombinedData,
} from "../types/datatype.ts";

interface HeaderProps {
  setKeywordState: Dispatch<SetStateAction<string>>;
  setAreaState: Dispatch<SetStateAction<string>>;
  setcontTypeState: Dispatch<SetStateAction<number>>;
  setfetchedData: React.Dispatch<
    React.SetStateAction<
      festivalCombinedData[] | lodgmentCombinedData[] | attractionCombinedData[]
    >
  >;
  isTop: boolean;
}

const Header: React.FC<HeaderProps> = ({
  setKeywordState,
  setAreaState,
  setcontTypeState,
  setfetchedData,
  isTop,
}) => {
  return (
    <header className={isTop ? styles.top : styles.noTop}>
      <div className={styles.headerContents}>
        <Link to="/">
          <h1
            className={styles.logo}
            onClick={() => {
              setKeywordState("");
              setAreaState("1");
              setfetchedData([]);
            }}
          >
            {isTop ? (
              <img src="../../public/logo_white.png" alt="logo"></img>
            ) : (
              <img src="../../public/logo_point.png" alt="logo"></img>
            )}
          </h1>
        </Link>
        <nav>
          <ul className={styles.menuList}>
            <Link to="/festival">
              <li
                className={`${styles.menuListItem} ${
                  isTop ? styles.top : styles.noTop
                }`}
                onClick={() => {
                  setcontTypeState(15);
                  setKeywordState("");
                  setAreaState("1");
                  setfetchedData([]);
                }}
              >
                행사
              </li>
            </Link>
            <Link to="/lodgment">
              <li
                className={`${styles.menuListItem} ${
                  isTop ? styles.top : styles.noTop
                }`}
                onClick={() => {
                  setcontTypeState(32);
                  setKeywordState("");
                  setAreaState("1");
                  setfetchedData([]);
                }}
              >
                숙소
              </li>
            </Link>
            <Link to="/attraction">
              <li
                className={`${styles.menuListItem} ${
                  isTop ? styles.top : styles.noTop
                }`}
                onClick={() => {
                  setcontTypeState(12);
                  setKeywordState("");
                  setAreaState("1");
                  setfetchedData([]);
                }}
              >
                관광지
              </li>
            </Link>
            <Link to="/mypage">
              <li
                className={`${styles.menuListItem} ${
                  isTop ? styles.top : styles.noTop
                }`}
              >
                마이페이지
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
