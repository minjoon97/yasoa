import styles from "../styles/HotArea.module.css";

interface HotAreaProps {
  item: string;
}

const HotArea: React.FC<HotAreaProps> = ({ item }) => {
  return (
    <li className={styles.cardItem}>
      <div className={styles.cardPhoto}></div>
      {item}
    </li>
  );
};

export default HotArea;
