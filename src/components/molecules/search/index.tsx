import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { Input, Dropdown, Button } from "components";
import { CollectionsService } from "services";

import styles from "./styles.module.scss";
import classNames from "classnames";

interface ISearch {
  className?: string;
}

export const Search: React.FC<ISearch> = ({ className = "" }) => {
  const router = useHistory();
  const [query, setQuery] = useState("istanbul");
  const [collection, setCollection] = useState();

  const getCollections = async () => await CollectionsService.list();

  const { isError, data: collectionList } = useQuery<any>(
    "collections",
    getCollections,
    { refetchInterval: false }
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleCollectionChange = (item: any) => setCollection(item?.value);

  const handleRoute = () => router.push("/search");

  if (isError) return <div>Error</div>;

  const searchBarCn = classNames(styles.wrapper, {
    [className]: !!className,
  });

  return (
    <div className={searchBarCn}>
      <Input
        placeholder="Query"
        className={styles.query}
        onChange={handleQueryChange}
      />
      <Dropdown
        onChange={handleCollectionChange}
        placeholder="Collections"
        className={styles.dropdown}
      >
        {collectionList?.map((collection: any, key: string) => (
          <Dropdown.Item
            key={key}
            label={collection.title}
            value={collection.id}
          />
        ))}
      </Dropdown>

      <Link to={{ pathname: "search", state: { query, collection } }}>
        <Button className={styles.action} onClick={handleRoute}>
          SEARCH
        </Button>
      </Link>
    </div>
  );
};
