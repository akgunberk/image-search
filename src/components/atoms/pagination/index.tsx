import classNames from "classnames";
import { Button } from "components";
import { useEffect, useState } from "react";
import { PubSub, SUBSCRIPTIONS } from "utils";
import Next from "assets/icons/next.svg";
import styles from "./styles.module.scss";

export const Pagination: React.FC<{ maxPage: number }> = ({ maxPage }) => {
  const [activePage, setActivePage] = useState(1);
  const [pageMultiplier, setPageMultiplier] = useState(1);

  useEffect(() => {
    PubSub.dispatch(SUBSCRIPTIONS.PAGINATION, activePage);
  }, [activePage]);

  const back = () => {
    if (activePage % 10 === 0) setPageMultiplier(pageMultiplier - 1);
    setActivePage(activePage > 1 ? activePage - 1 : 1);
  };

  const next = () => {
    if (activePage % 10 === 0) setPageMultiplier(pageMultiplier + 1);
    setActivePage(activePage + 1);
  };

  return (
    <div className={styles.pagination}>
      <img
        onClick={back}
        src={Next}
        width="20"
        height="20"
        alt="back arrow"
        className={styles.back}
      />
      <div className={styles.pageNumbers}>
        {Array.from(
          { length: 10 },
          (_, index) =>
            index + 1 <= maxPage && (
              <Button
                key={index}
                className={classNames(styles.page, {
                  [styles.active]: index + 1 === activePage,
                })}
                onClick={() => setActivePage(index + 1)}
              >
                {index + 1}
              </Button>
            )
        )}
      </div>
      <img
        onClick={next}
        src={Next}
        width="20"
        height="20"
        alt="next arrow"
        className={styles.next}
      />
    </div>
  );
};
