import { Search } from "components";
import { Link } from "react-router-dom";
import logo from "assets/icons/logo.svg";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          width="70"
          height="70"
          src={logo}
          className={styles.logo}
          alt="logo"
        />
      </Link>

      <Search className={styles.search} />
    </div>
  );
};
