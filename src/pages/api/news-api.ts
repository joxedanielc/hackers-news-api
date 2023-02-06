import axios, { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { snippetNews, newsValues } from "src/utils";

export const baseUrl = "https://hn.algolia.com/api/v1/search_by_date?";

export const getStories = (
  language: string,
  page: number,
  newsFavorited: number[]
) => {
  const [response, setResponse] = useState<snippetNews[]>([]);
  const [numberPages, setNumberPages] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [error, setError] = useState<AxiosError>();

  const setNewsFavorited =
    newsFavorited && newsFavorited.length > 0
      ? new Set(newsFavorited)
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
    fetchData();
  }, [language, page]);
  return { response, numberPages, totalRecords };
};
