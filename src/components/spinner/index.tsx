import React, { useEffect } from "react";
import Portal from "../portal";
import logo from "../../logo.svg";
import PubSub from "utils/pubsub";

import styles from "./styles.module.scss";
import { useToggle } from "hooks";

const Spinner: React.FC = () => {
  const [isLoading, toggle] = useToggle(false);

  useEffect(() => {
    const unsubcsribe = PubSub.subscribe("LOADING", () => toggle());

    return () => unsubcsribe();
  }, [toggle]);

  return (
    <Portal selector="#modal">
      {isLoading && (
        <div className={styles.spinner}>
          <img
            width="70"
            height="70"
            src={logo}
            className="App-logo"
            alt="logo"
          />
        </div>
      )}
    </Portal>
  );
};

export default Spinner;
