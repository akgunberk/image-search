import { Search } from "components";
import { Link } from "react-router-dom";

import logo from "assets/icons/logo.svg";
import styles from "./styles.module.scss";

export const LandingScreen = () => {
  return (
    <div className={styles.landingWrapper}>
      <Link to="/">
        <img
          width="70"
          height="70"
          src={logo}
          className="App-logo"
          alt="logo"
        />
      </Link>

      <h1 className={styles.brandName}>
        <strong>image</strong> search
      </h1>

      <Search className={styles.search} />
    </div>
  );
};
