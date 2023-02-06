import * as React from "react";
import styles from "@/styles/Styles.module.css";
import { snippetNews } from "src/utils";
import { FunctionComponent, ReactNode } from "react";
import NewsCard from "src/pages/components/newsCard";

interface Props {
  data: snippetNews[];
  isFavorited: boolean;
}

const NewsCardList: FunctionComponent<Props> = ({ data, isFavorited }) => {
  return (
    <div>
      <>
        {data.map((news, index) => {
          if (isFavorited === news.favorited) {
            return (
              <NewsCard
                timePosted={news.created_at}
                author={news.author}
                title={news.story_title}
                newsCardId={`${news.story_id}-${index.toString()}`}
              />
            );
          }
        })}
      </>
    </div>
  );
};

export default NewsCardList;
