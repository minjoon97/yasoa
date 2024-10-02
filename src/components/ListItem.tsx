import { useEffect, useState } from "react";
import styles from "../styles/ListItem.module.css";
import {
  festivalCombinedData,
  lodgmentCombinedData,
  attractionCombinedData,
} from "../types/datatype.ts";
import { useNavigate } from "react-router-dom";

interface ListItemProps {
  item: festivalCombinedData | lodgmentCombinedData | attractionCombinedData;
}

function isFestivalData(
  item: festivalCombinedData | lodgmentCombinedData | attractionCombinedData
): item is festivalCombinedData {
  return (item as festivalCombinedData).contenttypeid === "15";
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const [differenceInDays, setdifferenceInDays] = useState(0);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/detail", { state: { item: item } });
  };

  useEffect(() => {
    if (isFestivalData(item)) {
      function parseDateString(dateString: string): Date {
        const year = parseInt(dateString.substring(0, 4), 10);
        const month = parseInt(dateString.substring(4, 6), 10) - 1; // 월은 0부터 시작
        const day = parseInt(dateString.substring(6, 8), 10);
        return new Date(year, month, day);
      }
      const dateString: string = item.introData.eventstartdate;
      const targetDate: Date = parseDateString(dateString);
      const now: Date = new Date();
      const differenceInMilliseconds: number =
        targetDate.getTime() - now.getTime();
      setdifferenceInDays(
        Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
      );
    }
  }, [item]);

  return (
    <li className={styles.wrapper}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${item.firstimage})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className={styles.contents}>
        <div className={styles.contentsTop}>
          <div>
            <h3 className={styles.title}>{item.title}</h3>
            {isFestivalData(item) && (
              <p className={styles.date}>{item.introData.eventstartdate}</p>
            )}
            <p className={styles.addr}>{item.addr1}</p>
          </div>
          <div className={styles.interface}>
            <div className={styles.like}>
              <img src="../../public/heart.png" alt="" />
            </div>
            <button className={styles.detailBtn} onClick={handleClick}>
              상세보기
            </button>
            {isFestivalData(item) && (
              <div className={styles.dDay}>
                D-<span>{differenceInDays}</span>
              </div>
            )}
          </div>
        </div>
        <p className={styles.overview}>
          {item.commonData.overview.length > 320
            ? `${item.commonData.overview.slice(0, 320)}...`
            : item.commonData.overview}
        </p>
      </div>
    </li>
  );
};

export default ListItem;
