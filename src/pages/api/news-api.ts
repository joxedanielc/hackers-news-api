import axios, { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { snippetNews, newsValues, PageView } from "src/utils";

export const baseUrl = "https://hn.algolia.com/api/v1/search_by_date?";

export const getStories = (
  language: string,
  page: number,
  newsFavorited: snippetNews[],
  pageView: PageView,
  perPage: number
) => {
  const [response, setResponse] = useState<snippetNews[]>([]);
  const [numberPages, setNumberPages] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [error, setError] = useState<AxiosError>();

  const setNewsFavorited =
    newsFavorited && newsFavorited.length > 0
      ? new Set(newsFavorited.map((x) => x.story_id))
      : undefined;

  const fetchData = async () => {
    await axios
      .get(`${baseUrl}query=${language}&page=${page}`)
      .then(function (response) {
        setResponse(newsValues(response.data.hits, setNewsFavorited));
        setNumberPages(response.data.nbPages);
        setTotalRecords(response.data.nbHits);
      })
      .catch(function (error) {
        setError(error);
      });
  };

  useMemo(() => {
    if (pageView === PageView.all) {
      fetchData();
    } else {
      if (newsFavorited !== null) {
        const maxPage = Math.ceil(newsFavorited.length / perPage);
        setNumberPages(maxPage);
        setTotalRecords(newsFavorited.length);
        setResponse(newsFavorited);
      } else {
        setResponse([]);
      }
    }
  }, [language, page, pageView]);
  return { response, numberPages, totalRecords };
};
