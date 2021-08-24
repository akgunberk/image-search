import { API } from "utils";

export const CollectionsService = {
  //GET /collections
  list: async () => await API.get(`topics`),

  //GET /search/photos
  search: async ({
    query,
    collections,
    page,
  }: {
    query: string;
    collections: string;
    page?: string;
  }) =>
    await API.get(`search/photos`, { params: { query, collections, page } }),

  // GET /search/collections
  getQuery: async (query: string) =>
    await API.get(`search/collections`, { params: { query } }),
};
