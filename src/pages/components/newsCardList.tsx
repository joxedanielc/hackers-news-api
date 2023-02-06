import * as React from "react";
import styles from "@/styles/Styles.module.css";
import { snippetNews } from "src/utils";
import { FunctionComponent } from "react";
import NewsCard from "src/pages/components/newsCard";

interface Props {
  data: snippetNews[];
  isFavorited: boolean;
}

const NewsCardList: FunctionComponent<Props> = ({ data, isFavorited }) => {
  return (
    <div className={styles.datarow}>
      {data.map((news, index) => {
        return (
          <NewsCard
            news={news}
            newsCardId={`${news.story_id}-${index.toString()}`}
          />
        );
      })}
    </div>
  );
};

export default NewsCardList;
