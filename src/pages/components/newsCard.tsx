import * as React from "react";
import styles from "@/styles/Styles.module.css";
import { FunctionComponent } from "react";
import {
  snippetNews,
  getFavorites,
  VariablesStored,
  saveSessionStorage,
} from "@/utils";

interface Props {
  news: snippetNews;
  updateNewsFavorite: (news: snippetNews[]) => void;
  index: number;
}

const NewsCard: FunctionComponent<Props> = ({
  news,
  updateNewsFavorite,
  index,
}) => {
  const handleFavoritedNews = (news: snippetNews) => {
    let getNews = getFavorites();
    let newsFavorited =
      getNews.newsFavorited == null ? [] : getNews.newsFavorited;

    if (!newsFavorited.find((x) => x.story_id === news.story_id)) {
      newsFavorited.push({ ...news, favorited: true });
    } else {
      newsFavorited = newsFavorited.filter((x) => x.story_id !== news.story_id);
    }
    saveSessionStorage(VariablesStored.newsFavorited, newsFavorited);
    updateNewsFavorite(newsFavorited);
  };

  const handdleNewsOnClick = (url: string) => {
    window.open(url, "_blank");
  };

  const buttonDataTestId = `favoriteButton${index}`;
  return (
    <div data-testid="newsCardInformation" className={styles.informationCard}>
      <div
        className={styles.snippet}
        onClick={() => {
          handdleNewsOnClick(news.story_url);
        }}
      >
        <div className={styles.datarow}>
          <div className={styles.col12}>
            <span className={styles.postedTime}>
              <img src={"/time.png"} className={styles.time} />
              {news?.created_at} by
              {news?.author}
            </span>
          </div>
          <div className={styles.col12}>
            <span className={styles.newsSnippet}>{news?.story_title}</span>
          </div>
        </div>
      </div>

      <div className={styles.favorited}>
        <button
          data-testid={buttonDataTestId}
          onClick={() => {
            handleFavoritedNews(news);
          }}
        >
          {news?.favorited ? (
            <img src={"/favorite.png"} className={styles.favorite} />
          ) : (
            <img src={"/favoriteempty.png"} className={styles.favorite} />
          )}
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
