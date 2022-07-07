//This files contains all apis used in application

export const anime_list = (page = 1) =>
  `https://api.jikan.moe/v4/anime?page=${page}`;
export const anime_detail = (id) => `https://api.jikan.moe/v4/anime/${id}`;
