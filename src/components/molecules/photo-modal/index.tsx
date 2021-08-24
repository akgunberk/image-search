import { useEffect, useState } from "react";
import { Map, Modal } from "components";
import { PhotosService } from "services";
import { API } from "utils";

import arrowDownload from "assets/icons/arrow-download.svg";
import styles from "./styles.module.scss";

export interface IPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  description: string;
  width: number;
  height: number;
  user: {
    username: string;
    instagram_username: string;
    location: string;
    profile_image: {
      small: string;
    };
  };
  location: {
    city?: string;
    country?: string;
    title?: string;
    position?: {
      latitude?: number;
      longitude?: number;
    };
  };
}

interface IPhotoModal {
  onToggle: () => void;
  photo: IPhoto | null;
}

export const PhotoModal: React.FC<IPhotoModal> = ({ onToggle, photo }) => {
  const { id, description, urls, user, location } = photo ?? {};
  const [url, setUrl] = useState<string | undefined | any>();

  useEffect(() => {
    (async () => {
      const blob = await API.get(urls?.small!, { responseType: "blob" });
      const url = window.URL.createObjectURL(blob);
      setUrl(url);
    })();
  }, [urls]);

  const triggerDownload = async () => {
    try {
      await PhotosService.trackDownload(id!);
    } catch (error) {}
  };

  return (
    <>
      <Modal className={styles.modal} isOpen={!!photo} onToggle={onToggle}>
        {photo && (
          <img
            className={styles.image}
            key={id}
            alt={description}
            src={urls?.small}
          />
        )}

        <div className={styles.photoInfo}>
          <div className={styles.userInfo}>
            {user?.profile_image && (
              <img
                className={styles.profile}
                key={id}
                alt="user profile"
                src={user.profile_image.small}
              />
            )}
            <span className={styles.social}>
              {user?.username && (
                <a
                  className={styles.username}
                  href={`https://unsplash.com/${user?.username}`}
                >
                  {user?.username}
                </a>
              )}
              {user?.instagram_username && (
                <a
                  className={styles.insta}
                  href={`https://instagram.com/${user?.instagram_username}`}
                >
                  @${user.instagram_username}
                </a>
              )}
            </span>
          </div>
          <a href={url} download="image.jpg" target="_self">
            <div className={styles.download} onClick={triggerDownload}>
              <img src={arrowDownload} width="12" height="12" alt="download" />
              <span className={styles.downloadText}>Download</span>
            </div>
          </a>
        </div>

        <Map {...location} />
      </Modal>
    </>
  );
};
