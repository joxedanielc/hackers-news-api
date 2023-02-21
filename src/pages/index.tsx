import * as React from "react";
import Head from "next/head";
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
import Header from "./components/header";
import SwitchNews from "./components/switch";
import { Pagination } from "@mui/material";

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

  const handleChangePageView = () => {
    const view = pageView === PageView.all ? PageView.myFaves : PageView.all;
    setPageView(view);
  };

  const handleCodeLanguageChange = (codeLanguage: string): void => {
    setCodeLanguage(codeLanguage);
    saveSessionStorage(VariablesStored.codeLanguageSelected, codeLanguage);
  };

  const alertMessage =
    pageView === PageView.all
      ? "We can't seem to find any news."
      : "There is not favorited news yet.";

  return (
    <>
      <Head>
        <title>HN Read</title>
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
      <main id={"content"} role={"main"}>
        <Header></Header>
        <div className="container text-center">
          <div className="row mt-5 mb-4">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              {pageView === PageView.all && (
                <SelectLanguages
                  onCodeLanguageChange={handleCodeLanguageChange}
                  value={codeLanguage}
                ></SelectLanguages>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex justify-content-center">
              <SwitchNews
                label={pageView}
                onSwitchChange={handleChangePageView}
              ></SwitchNews>
            </div>
          </div>
        </div>
        <div className="container">
          {response.length > 0 ? (
            <>
              <NewsCardList
                data={response}
                updateNewsFavorite={updateNewsFavorite}
              ></NewsCardList>
              <div className="row mt-2 mb-2 d-flex justify-content-center">
                <div className="d-flex justify-content-center">
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
            </>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="alert alert-info" role="alert">
                  {alertMessage}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
