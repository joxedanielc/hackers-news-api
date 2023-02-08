import * as React from "react";
import Head from "next/head";
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
import { GetStories } from "src/pages/api/news-api";

import { Pagination } from "@mui/material";
import clsx from "clsx";

export default function Home() {
  const [codeLanguage, setCodeLanguage] = useState(getLanguageCodeSelected());
  const [page, setPage] = useState(0);
  const [pageView, setPageView] = useState(PageView.all);

  const perPage = 20;

  const { response, numberPages, totalRecords, updateNewsFavorite } =
    GetStories(codeLanguage, page, getFavorites(), pageView, perPage);

  const count = Math.ceil(totalRecords / perPage);

  const usePagination = (itemsPerPage: number, totalRecords: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(totalRecords / itemsPerPage);

    function next() {
      setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
      setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }

    function jump(page: any) {
      const pageNumber = Math.max(1, page);
      setCurrentPage(() => Math.min(pageNumber, maxPage));
    }

    return { next, prev, jump, currentPage, maxPage };
  };

  const { next, prev, jump, currentPage, maxPage } = usePagination(
    perPage,
    numberPages
  );

  const handleChange = (e: any, p: number) => {
    setPage(p - 1);
    jump(p);
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
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.hackerNews}>HACKER NEWS</span>
        </div>
        <div className={styles.paginationContainer}>
          <div className={styles.centerTabs}>
            <div className={styles.datarow}>
              <div
                className={clsx(styles.rectangle, {
                  [styles.rectangleSelected]: pageView === PageView.all,
                })}
              >
                <button
                  data-testid="allNewsView"
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
                  data-testid="myFavesNewsView"
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
            <NewsCardList
              data={response}
              updateNewsFavorite={updateNewsFavorite}
            ></NewsCardList>
            <div className={styles.paginationContainer}>
              <div className={styles.center}>
                <Pagination
                  count={count}
                  size="large"
                  page={page + 1}
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
