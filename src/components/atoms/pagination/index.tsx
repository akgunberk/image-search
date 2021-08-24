import { useState } from "react";
import { Button } from "components";
import Next from "assets/icons/next.svg";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface IPagination {
  maxPage: number;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<IPagination> = ({
  maxPage,
  activePage,
  setActivePage,
}) => {
  const [pageMultiplier, setPageMultiplier] = useState(1);

  const back = () => {
    if (activePage % 10 === 0) setPageMultiplier(pageMultiplier - 1);
    setActivePage(activePage > 1 ? activePage - 1 : 1);
  };

  const next = () => {
    console.log(activePage % 10 === 0);
    if (activePage % 10 === 0) setPageMultiplier(pageMultiplier + 1);
    setActivePage(activePage < maxPage ? activePage + 1 : activePage);
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
        {Array.from({ length: 10 }, (_, index) => {
          const pageNumber = pageMultiplier * 10 + index + 1;
          return (
            pageNumber <= maxPage && (
              <Button
                key={index}
                className={classNames(styles.page, {
                  [styles.active]: pageNumber === activePage,
                })}
                onClick={() => setActivePage(pageNumber)}
              >
                {console.log(activePage, pageNumber, pageMultiplier)}
                {pageNumber}
              </Button>
            )
          );
        })}
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
