import styles from "../styles/Header.module.css";

interface HeaderProps {
  serviceList: string[];
}

const Header: React.FC<HeaderProps> = ({ serviceList }) => {
  return (
    <header>
      <div className={styles.headerContents}>
        <h1 className={styles.logo}>
          <a href="#">
            <img src="../../public/logo_white.png" alt="logo"></img>
          </a>
        </h1>
        <nav>
          <ul className={styles.menuList}>
            {serviceList.map((item, i) => (
              <li key={i} className={styles.menuListItem}>
                {item}
              </li>
            ))}
            <li className={styles.menuListItem}>마이페이지</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
