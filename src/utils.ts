import moment from "moment";

export enum VariablesStored {
  newsFavorited = "news_favorited",
  codeLanguageSelected = "code_language_selected",
}

export enum PageView {
  all = "All News",
  myFaves = "My Faves",
}

export enum CodeLanguageEnum {
  angular = "Angular",
  reactjs = "Reactjs",
  vuesjs = "Vuesjs",
}

export interface selectOptions {
  name: string;
  value?: string;
  icon?: string;
}

export interface snippetNews {
  story_id: number;
  story_title: string;
  story_url: string;
  author: string;
  created_at: string;
  favorited: boolean;
}

export interface paginationReturn {
  next: () => void;
  prev: () => void;
  jump: (page: number) => void;
  currentPage: number;
  maxPage: number;
}

const verifyProperty = (value: string): boolean => {
  const unwantedValues = new Set([" ", null, "null"]);

  return unwantedValues.has(value);
};

const getTimeDifference = (created_at: string): string => {
  let start = moment(created_at, "YYYY-MM-DDTHH:mm:ss.SSSSZ");
  let now = moment();
  let end = moment(now, "YYYY-MM-DDTHH:mm:ss.SSSSZ");
  const diff = end.diff(start, "h");
  return diff.toString();
};

export const newsValues = (
  data: any[],
  setNewsFavorited?: Set<number>
): snippetNews[] => {
  const newsFiltered: any[] = data.filter((news) => {
    return (
      news.story_id &&
      !verifyProperty(news.story_id) &&
      news.story_title &&
      !verifyProperty(news.story_title) &&
      news.author &&
      !verifyProperty(news.author) &&
      news.created_at &&
      !verifyProperty(news.created_at) &&
      news.story_url &&
      !verifyProperty(news.story_url)
    );
  });

  const news = newsFiltered.map((news) => ({
    story_id: news.story_id,
    story_title: news.story_title,
    story_url: news.story_url,
    author: news.author,
    created_at: `${getTimeDifference(news.created_at)} hour(s) ago`,
    favorited: setNewsFavorited ? setNewsFavorited.has(news.story_id) : false,
  }));

  return news.filter(
    (v, i, a) => a.findIndex((v2) => v2.story_id === v.story_id) === i
  );
};

const isBrowser = () => typeof window !== "undefined";

const getSessionStorage = (key: string) => {
  if (isBrowser()) {
    const data = window.sessionStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  }
};

export const saveSessionStorage = (key: string, value: any) => {
  if (isBrowser()) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFavorites = () => {
  const newsFavorited = getSessionStorage(
    VariablesStored.newsFavorited
  ) as snippetNews[];
  const newsFavoritedIds =
    newsFavorited && newsFavorited.length > 0
      ? new Set(newsFavorited.map((x) => x.story_id))
      : undefined;
  return { newsFavorited, newsFavoritedIds };
};

export const getLanguageCodeSelected = (): string => {
  let codeLanguage = getSessionStorage(VariablesStored.codeLanguageSelected);
  if (!codeLanguage) {
    codeLanguage = CodeLanguageEnum.angular.toLowerCase();
  }

  return codeLanguage;
};
