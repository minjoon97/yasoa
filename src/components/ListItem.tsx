import styles from "../styles/ListItem.module.css";
import {
  festivalCombinedData,
  lodgmentCombinedData,
  attractionCombinedData,
} from "../types/datatype.ts";

interface ListItemProps {
  item: festivalCombinedData | lodgmentCombinedData | attractionCombinedData;
}

function isFestivalData(
  item: festivalCombinedData | lodgmentCombinedData | attractionCombinedData
): item is festivalCombinedData {
  return (item as festivalCombinedData).introData.eventstartdate !== undefined;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.image}></div>
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
            <div className={styles.like}></div>
            <button className={styles.detailBtn}>상세보기</button>
            <div className={styles.dDay}></div>
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
