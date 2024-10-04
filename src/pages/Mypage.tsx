import { useNavigate } from "react-router-dom";
import styles from "../styles/Mypage.module.css";
import {
  festivalCombinedData,
  lodgmentCombinedData,
  attractionCombinedData,
} from "../types/datatype.ts";

const Mypage = () => {
  const festivalItems = localStorage.getItem("festivalLike");
  const parsedfestivalItems = festivalItems ? JSON.parse(festivalItems) : [];

  const lodgmentItems = localStorage.getItem("lodgmentLike");
  const parsedlodgmentItems = lodgmentItems ? JSON.parse(lodgmentItems) : [];

  const attractionItems = localStorage.getItem("attractionLike");
  const parsedattractionItems = attractionItems
    ? JSON.parse(attractionItems)
    : [];

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1 className={styles.topTitle}>
          안녕하세요,<br></br>사용자님!
        </h1>
      </div>
      <section className={styles.main}>
        <div className={styles.festList}>
          <h2>내가 찜한 행사목록</h2>
          <ul className={styles.festListUl}>
            {parsedfestivalItems.map((item: festivalCombinedData) => (
              <li
                onClick={() => {
                  navigate("/detail", { state: { item: item } });
                }}
              >
                {item.title}
                <br></br>
                {item.introData.eventstartdate}
                <br></br>
                {item.addr1}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.lodgList}>
          <h2>내가 찜한 숙소목록</h2>
          <ul className={styles.lodgListUl}>
            {parsedlodgmentItems.map((item: lodgmentCombinedData) => (
              <li
                onClick={() => {
                  navigate("/detail", { state: { item: item } });
                }}
              >
                {item.title}
                <br></br>
                {item.introData.roomtype}
                <br></br>
                {item.addr1}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.attrList}>
          <h2>내가 찜한 관광지목록</h2>
          <ul className={styles.attrListUl}>
            {parsedattractionItems.map((item: attractionCombinedData) => (
              <li
                onClick={() => {
                  navigate("/detail", { state: { item: item } });
                }}
              >
                {item.title}
                <br></br>
                {item.addr1}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Mypage;
