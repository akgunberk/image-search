import { useEffect, useState } from "react";
import { PubSub, SUBSCRIPTIONS } from "utils";

export const usePagination = (initialPage = 1): [number] => {
  const [activePage, setActivePage] = useState(initialPage);

  useEffect(() => {
    const unsubcsribe = PubSub.subscribe(
      SUBSCRIPTIONS.PAGINATION,
      setActivePage
    );

    return () => unsubcsribe();
  }, []);

  return [activePage];
};
