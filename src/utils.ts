import { Dispatch, SetStateAction } from "react";

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

export const newsValues = (
  data: any[],
  setNewsFavorited?: Set<number>
): snippetNews[] => {
  //console.log("data", data);
  const newsFiltered: any[] = data.filter((news) => {
    return (
      news.story_id &&
      news.story_id !== null &&
      news.story_id !== "null" &&
      news.story_title &&
      news.story_title !== null &&
      news.story_title !== "null" &&
      news.author &&
      news.author !== null &&
      news.author !== "null" &&
      news.created_at &&
      news.created_at !== null &&
      news.created_at !== "null"
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

export const getSessionStorage = (key: string) => {
  if (isBrowser()) {
    const data = window.sessionStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        return parsed;
      } catch {
        return {};
      }
    }
    return {};
  }
};

export const saveSessionStorage = (key: string, value: any) => {
  if (isBrowser()) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFavorites = (): number[] => {
  const newsFavorited = getSessionStorage("news_favorited");

  return newsFavorited;
};
