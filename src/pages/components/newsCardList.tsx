import * as React from "react";
import styles from "@/styles/Styles.module.css";
import { snippetNews } from "src/utils";
import { FunctionComponent } from "react";
import NewsCard from "src/pages/components/newsCard";

interface Props {
  data: snippetNews[];
  updateNewsFavorite: (news: snippetNews[]) => void;
}

const NewsCardList: FunctionComponent<Props> = ({
  data,
  updateNewsFavorite,
}) => {
  return (
    <div className={styles.datarow}>
      {data.map((news, index) => {
        return (
          <NewsCard
            key={`${news.story_id}-${index.toString()}`}
            news={news}
            updateNewsFavorite={updateNewsFavorite}
          />
        );
      })}
    </div>
  );
};

export default NewsCardList;
