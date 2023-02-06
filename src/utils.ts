import { Dispatch, SetStateAction } from "react";

export enum VariablesStored {
  newsFavorited = "news_favorited",
  codeLanguageSelected = "code_language_selected",
}

export enum PageView {
  all = "all",
  myFaves = "myFaves",
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

const verifyProperty = (value: string): boolean => {
  const unwantedValues = new Set([" ", null, "null"]);

  return unwantedValues.has(value);
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
      !verifyProperty(news.created_at)
    );
  });

  return newsFiltered.map((news) => ({
    story_id: news.story_id,
    story_title: news.story_title,
    story_url: news.story_id,
    author: news.author,
    created_at: news.created_at,
    favorited: setNewsFavorited ? setNewsFavorited.has(news.story_id) : false,
  }));
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

export const getFavorites = (): snippetNews[] => {
  const newsFavorited = getSessionStorage(VariablesStored.newsFavorited);

  return newsFavorited;
};

export const getLanguageCodeSelected = (): string => {
  let codeLanguage = getSessionStorage(VariablesStored.codeLanguageSelected);
  if (!codeLanguage) {
    codeLanguage = CodeLanguageEnum.angular.toLowerCase();
  }

  return codeLanguage;
};
