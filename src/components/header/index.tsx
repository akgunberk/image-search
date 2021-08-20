import styles from "./styles.module.scss";
import logo from "../../logo.svg";
import Dropdown from "components/dropdown";

export default function Header() {
  return (
    <div className={styles.header}>
      <img width="70" height="70" src={logo} className="App-logo" alt="logo" />
      <Dropdown placeholder="Collections">
        <Dropdown.Item value="Collection1">Collection</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
