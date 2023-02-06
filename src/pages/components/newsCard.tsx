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
  newsCardId: string;
}

const NewsCard: FunctionComponent<Props> = ({ news, newsCardId }) => {
  const saveFavoritedNews = (news: snippetNews) => {
    let savedNews = getFavorites();
    let newsFavorited = savedNews == null ? [] : savedNews;
    if (newsFavorited.length > 0) {
      newsFavorited = newsFavorited.filter((x) => x.story_id !== news.story_id);
    }
    newsFavorited.push({ ...news, favorited: true });
    saveSessionStorage(VariablesStored.newsFavorited, newsFavorited);
  };

  return (
    <div className={styles.informationCard} key={newsCardId}>
      <div className={styles.snippet}>
        <div className={styles.row}>
          <div className={styles.col12}>
            <span className={styles.postedTime}>
              <img src={"/time.png"} className={styles.time} />
              {news.created_at} by
              {news.author}
            </span>
          </div>
          <div className={styles.col12}>
            <span className={styles.newsSnippet}>{news.story_title}</span>
          </div>
        </div>
      </div>

      <div className={styles.favorited}>
        <button
          onClick={() => {
            saveFavoritedNews(news);
          }}
        >
          {news.favorited ? (
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
