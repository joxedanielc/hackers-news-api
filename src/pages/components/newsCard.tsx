import * as React from "react";
import styles from "@/styles/Styles.module.css";
import { FunctionComponent } from "react";
import parse from "html-react-parser";

interface Props {
  timePosted: string;
  author: string;
  title: string;
  newsCardId: string;
}

const NewsCard: FunctionComponent<Props> = ({
  timePosted,
  author,
  title,
  newsCardId,
}) => {
  return (
    <div className={styles.informationCard} key={newsCardId}>
      <div className={styles.snippet}>
        <div className={styles.row}>
          <div className={styles.col12}>
            <span className={styles.postedTime}>
              <img src={"/time.png"} className={styles.time} />
              {timePosted} by
              {author}
            </span>
          </div>
          <div className={styles.col12}>
            <span className={styles.newsSnippet}>{title}</span>
          </div>
        </div>
      </div>

      <div className={styles.favorited}>
        <img src={"/favoriteempty@2x.png"} className={styles.favoriteempty} />
      </div>
    </div>
  );
};

export default NewsCard;
