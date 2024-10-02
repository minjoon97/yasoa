import {
  festivalCombinedData,
  lodgmentCombinedData,
  attractionCombinedData,
} from "../types/datatype.ts";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/DetailPage.module.css";
import { Dispatch, SetStateAction, useEffect } from "react";

interface DetailPageProps {
  item?: festivalCombinedData | lodgmentCombinedData | attractionCombinedData;
  setAreaState: Dispatch<SetStateAction<string>>;
}

const DetailPage: React.FC<DetailPageProps> = ({ setAreaState }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;

  const isFestival = item.contenttypeid === "15" ? true : false;
  const isLodgment = item.contenttypeid === "32" ? true : false;
  const isAttraction = item.contenttypeid === "12" ? true : false;

  useEffect(() => {
    setAreaState("1");
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.topContainer}>
          <p className={styles.goBack} onClick={() => navigate(-1)}>
            &lt; 리스트로 가기
          </p>
          <div className={styles.tcContents}>
            <span className={styles.category}>
              {isFestival ? "행사" : isLodgment ? "숙박" : "관광지"}
            </span>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.address}>{item.addr1}</p>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.imageBox}>
            <img className={styles.image} src={item.firstimage} alt=""></img>
          </div>
          <div className={styles.detailinfo}>
            {isFestival && (
              <p>
                <span>이벤트 장소</span>
                <br></br>
                {item.introData.eventplace}
              </p>
            )}
            {isFestival && (
              <p>
                <span>운영 기간</span>
                <br></br>
                {item.introData.eventstartdate +
                  " - " +
                  item.introData.eventenddate}
              </p>
            )}
            {isFestival && (
              <p>
                <span>운영 시간</span>
                <br></br>
                {item.introData.playtime}
              </p>
            )}
            {isLodgment && (
              <p>
                <span>방 개수</span>
                <br></br>
                {item.introData.roomcount}
              </p>
            )}
            {isLodgment && (
              <p>
                <span>방 타입</span>
                <br></br>
                {item.introData.roomtype}
              </p>
            )}
            {isLodgment && (
              <p>
                <span>체크인 시간</span>
                <br></br>
                {item.introData.checkintime}
              </p>
            )}
            {isLodgment && (
              <p>
                <span>체크아웃 시간</span>
                <br></br>
                {item.introData.checkouttime}
              </p>
            )}
            {isLodgment && (
              <p>
                <span>주차 가능 여부</span>
                <br></br>
                {item.introData.parkinglodging}
              </p>
            )}
            {isAttraction && (
              <p>
                <span>전화번호</span>
                <br></br>
                {item.introData.infocenter}
              </p>
            )}
            {isAttraction && (
              <p>
                <span>휴무일</span>
                <br></br>
                {item.introData.restdate}
              </p>
            )}
            {isAttraction && (
              <p>
                <span>주차</span>
                <br></br>
                {item.introData.parking}
              </p>
            )}
            <p>
              <span>홈페이지</span>
              <br></br>
              {item.commonData.homepage}
            </p>
            <p>
              <span>상세정보</span>
              <br></br>
              {item.commonData.overview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
