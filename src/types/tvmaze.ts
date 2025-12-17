/**
 * TVmaze types used by this app.
*/
export type TvMazeImage = {
  medium?: string | null;
  original?: string | null;
};

export type TvMazeRating = {
  average?: number | null;
};

export type TvMazeShow = {
  id: number;
  name: string;
  url?: string;
  type?: string | null;
  language?: string | null;
  genres: string[];
  status?: string | null;
  runtime?: number | null;
  premiered?: string | null;
  officialSite?: string | null;
  rating: TvMazeRating;
  image?: TvMazeImage | null;
  summary?: string | null;
};

export type TvMazeSearchResult = {
  score: number;
  show: TvMazeShow;
};
