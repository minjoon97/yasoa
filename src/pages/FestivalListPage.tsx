import styles from "../styles/FestivalListPage.module.css";
import ListItem from "../components/ListItem.tsx";

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

interface FestivalListPageProps {
  fetchedData: festivalCombinedData[];
}

const FestivalListPage: React.FC<FestivalListPageProps> = ({ fetchedData }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.topTitle}>
          <h2>행사</h2>
          <p>Festival</p>
        </div>
      </div>
      <div className={styles.searchContent}></div>
      <div className={styles.listContent}>
        <ul>
          {fetchedData?.map((item, i) => (
            <ListItem key={i} item={item}></ListItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FestivalListPage;
