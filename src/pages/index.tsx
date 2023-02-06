import * as React from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Styles.module.css";
import SelectLanguages from "src/pages/components/selector";
import NewsCardList from "@/pages/components/newsCardList";
import { useState } from "react";
import {
  getLanguageCodeSelected,
  saveSessionStorage,
  getFavorites,
  VariablesStored,
  PageView,
} from "src/utils";
import { getStories } from "src/pages/api/news-api";
import usePagination from "src/pages/components/pagination";
import { Pagination } from "@mui/material";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [codeLanguage, setCodeLanguage] = useState(getLanguageCodeSelected());
  const [page, setPage] = useState(0);
  const [pageView, setPageView] = useState(PageView.all);
  const perPage = 20;

  const { response, numberPages, totalRecords } = getStories(
    codeLanguage,
    page,
    getFavorites(),
    pageView,
    perPage
  );

  const count = Math.ceil(totalRecords / perPage);
  const dataPerPagination = usePagination(
    response,
    perPage,
    numberPages,
    totalRecords
  );

  const handleChange = (e: any, p: number) => {
    setPage(p);
    dataPerPagination.jump(p);
  };

  const handleChangePageView = (e: any, pView: string) => {
    const view = pView === PageView.all ? PageView.all : PageView.myFaves;
    setPageView(view);
    e.preventDefault();
  };

  const handleCodeLanguageChange = (codeLanguage: string): void => {
    setCodeLanguage(codeLanguage);
    saveSessionStorage(VariablesStored.codeLanguageSelected, codeLanguage);
  };

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
        <div className={styles.paginationContainer}>
          <div className={styles.center}>
            <div className={styles.datarow}>
              <div
                className={clsx(styles.rectangle, {
                  [styles.rectangleSelected]: pageView === PageView.all,
                })}
              >
                <button
                  onClick={(e) => {
                    handleChangePageView(e, PageView.all);
                  }}
                >
                  <span>All</span>
                </button>
              </div>
              <div
                className={clsx(styles.rectangle, {
                  [styles.rectangleSelected]: pageView === PageView.myFaves,
                })}
              >
                <button
                  onClick={(e) => {
                    handleChangePageView(e, PageView.myFaves);
                  }}
                >
                  <span>My Faves</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {pageView === PageView.all && (
          <SelectLanguages
            onCodeLanguageChange={handleCodeLanguageChange}
            value={codeLanguage}
          ></SelectLanguages>
        )}
        {response.length > 0 && (
          <div className={styles.maincontainer}>
            <NewsCardList data={response} isFavorited={false}></NewsCardList>
            <div className={styles.paginationContainer}>
              <div className={styles.center}>
                <Pagination
                  count={count}
                  size="large"
                  page={page}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
