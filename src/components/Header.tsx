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
}

const Header: React.FC<HeaderProps> = ({
  setKeywordState,
  setAreaState,
  setcontTypeState,
  setfetchedData,
}) => {
  return (
    <header>
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
            <img src="../../public/logo_white.png" alt="logo"></img>
          </h1>
        </Link>
        <nav>
          <ul className={styles.menuList}>
            <Link to="/festival">
              <li
                className={styles.menuListItem}
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
                className={styles.menuListItem}
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
                className={styles.menuListItem}
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
            <li className={styles.menuListItem}>마이페이지</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
