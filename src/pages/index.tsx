import * as React from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/new_Home.module.css";
import SelectLanguages from "src/pages/components/selector";
import NewsCardList from "@/pages/components/newsCardList";
import { useState } from "react";
import { getSessionStorage, saveSessionStorage, getFavorites } from "src/utils";
import { getStories } from "src/pages/api/news-api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [codeLanguage, setCodeLanguage] = useState("angular");
  const [page, setPage] = useState(0);

  const data = getStories(codeLanguage, page, getFavorites());

  return (
    <>
      <Head>
        <title>Hacker News</title>
        <meta
          name="description"
          content="Get all the latest information from Hacher News API"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <span className="HACKER-NEWS Text-Style">HACKER NEWS</span>
        </div>
        <SelectLanguages></SelectLanguages>
        <NewsCardList data={data} isFavorited={false}></NewsCardList>
      </main>
    </>
  );
}
