import { useLocation } from "react-router-dom";
import { Header, IPhoto, Pagination, PhotoModal, Spinner } from "components";
import { CollectionsService, PhotosService } from "services";

import styles from "./styles.module.scss";
import { useQuery } from "react-query";
import { useState } from "react";
import { usePagination } from "hooks/usePagination";

interface ILocationState {
  query?: string;
  collection?: string;
}

export const SearchScreen = () => {
  const {
    state: { query, collection },
  } = useLocation<ILocationState>();
  const [page] = usePagination(1);

  const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);
  const clearSelectedPhoto = () => setSelectedPhoto(null);

  const getPhotoDetail = async (id: string) => {
    const photo = await PhotosService.search(id);
    setSelectedPhoto(photo);
  };

  const getPhotos = async ({
    query,
    collection,
    page,
  }: {
    query: string;
    collection: string;
    page: string;
  }) =>
    await CollectionsService.search({ query, collections: collection, page });
  const {
    isLoading,
    isError,
    isSuccess,
    data: { results: photos = [], total_pages: maxPage = 10 } = {},
  } = useQuery<any>([query!, collection!, page], () =>
    getPhotos({
      query: query!,
      collection: collection!,
      page: String(page!),
    })
  );

  return (
    <div className={styles.landingWrapper}>
      <Header />

      {isLoading && <Spinner />}
      {isError && <div>Error</div>}

      {isSuccess && photos && (
        <>
          <div className={styles.masonry}>
            {photos?.map((photo: IPhoto) => (
              <img
                onClick={() => getPhotoDetail(photo.id)}
                key={photo.id}
                alt={photo.description}
                src={photo.urls.small}
              />
            ))}
          </div>

          <PhotoModal photo={selectedPhoto} onToggle={clearSelectedPhoto} />
          <Pagination maxPage={maxPage} />
        </>
      )}
    </div>
  );
};
