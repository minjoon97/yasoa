import styles from "../styles/FestivalListPage.module.css";
import ListItem from "../components/ListItem.tsx";
import { useState, useEffect } from "react";

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
  fetchedData: festivalType[];
  apiKey: string;
}

const FestivalListPage: React.FC<FestivalListPageProps> = ({
  fetchedData,
  apiKey,
}) => {
  const [finalData, setFinalData] = useState<festivalCombinedData[]>();

  const fetchCommonList = async (item: festivalType) => {
    const commonUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${item.contentid}&contentTypeId=15&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1`;
    const res = await fetch(commonUrl);
    const fetchedCommonResult = await res.json();
    return fetchedCommonResult;
  };

  const fetchIntroList = async (item: festivalType) => {
    const introUrl = `https://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${apiKey}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${item.contentid}&contentTypeId=15&numOfRows=10&pageNo=1`;
    const res = await fetch(introUrl);
    const fetchedIntroResult = await res.json();
    return fetchedIntroResult;
  };

  useEffect(() => {
    const fetchFinalData = async () => {
      const combinedData: festivalCombinedData[] = [];

      for (const item of fetchedData) {
        const commonData = await fetchCommonList(item);
        const introData = await fetchIntroList(item);

        const mergedData = {
          ...item,
          commonData: commonData.response.body.items.item[0],
          introData: introData.response.body.items.item[0],
        };

        combinedData.push(mergedData);
      }
      setFinalData(combinedData);
    };
    fetchFinalData();
  }, [fetchedData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}></div>
      <div className={styles.searchContent}></div>
      <div className={styles.listContent}>
        <ul>
          {finalData?.map((item, i) => (
            <ListItem key={i} item={item}></ListItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FestivalListPage;
