import { IPhoto } from "components";
import { API } from "utils";

export const PhotosService = {
  // GET /photos/:id
  search: async (id: string): Promise<IPhoto> => await API.get(`photos/${id}`),

  //GET /photos/:id/download
  trackDownload: async (id: string): Promise<{ url: string }> =>
    await API.get(`photos/${id}/download`),
};
