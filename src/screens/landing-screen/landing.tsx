import { Button, Dropdown, Input, Modal } from "components";
import { useToggle } from "hooks";
import PubSub from "utils/pubsub";
import logo from "../../logo.svg";
import styles from "./styles.module.scss";

const LandingScreen = () => {
  const [isOpen, toggle] = useToggle(false);

  const handleSearch = () => PubSub.dispatch("LOADING");

  const handleQueryChange = () => {};

  return (
    <div className={styles.landingWrapper}>
      <img width="70" height="70" src={logo} className="App-logo" alt="logo" />
      <h1 className={styles.brandName}>
        <strong>image</strong> search
      </h1>
      <Input
        placeholder="Query"
        className={styles.query}
        onChange={handleQueryChange}
      />
      <Dropdown placeholder="Collections" className={styles.dropdown}>
        <Dropdown.Item value="Collection1">Collection1</Dropdown.Item>
        <Dropdown.Item value="Collection2">Collection2</Dropdown.Item>
      </Dropdown>
      <Button className={styles.action} onClick={handleSearch}>
        SEARCH
      </Button>
      <Modal isOpen={isOpen} toggleModal={toggle}>
        <div>Here I am</div>
        <Button onClick={toggle}>close me</Button>
      </Modal>
    </div>
  );
};

export default LandingScreen;
