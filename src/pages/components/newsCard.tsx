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
    <div className="col-md-6 col-sm-12 col-xs-12 mb-3">
      <div className={"card"}>
        <div className="card-header">
          <div className="row">
            <div className="col-10">
              <span className={styles.postedTime}>
                <img src={"/time.png"} className={styles.time} />
                {news?.created_at} by
                {news?.author}
              </span>
            </div>
            <div className="col-2 text-center">
              <button
                className={styles.favButton}
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
        </div>
        <div
          data-testid="newsCardInformation"
          className={"card-body"}
          onClick={() => {
            handdleNewsOnClick(news.story_url);
          }}
          role="button"
        >
          <div className="row">
            <div className="col-12">
              <p>{news?.story_title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
