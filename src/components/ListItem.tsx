import styles from "../styles/ListItem.module.css";

interface festivalType {
  addr1: string;
  addr2: string;
  areacode: string;
  contentid: string;
  contenttypeid: string;
  firstimage: string;
  firstimage2: string;
  tel: string;
  title: string;
}

interface festivalCombinedData extends festivalType {
  commonData: {
    title: string;
    tel: string;
    homepage: string;
    firstimage: string;
    firstimage2: string;
    overview: string;
  };
  introData: {
    sponsor1: string;
    sponsor1tel: string;
    eventstartdate: string;
    eventenddate: string;
    eventplace: string;
    usetimefestival: string;
  };
}

interface ListItemProps {
  item: festivalCombinedData;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.image}></div>
      <div className={styles.contents}>
        <div className={styles.contentsTop}>
          <div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.date}>{item.introData.eventstartdate}</p>
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
