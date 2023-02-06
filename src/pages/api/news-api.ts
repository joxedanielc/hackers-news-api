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
  const [error, setError] = useState<AxiosError>();

  const setNewsFavorited =
    newsFavorited && newsFavorited.length > 0
      ? new Set(newsFavorited)
      : undefined;

  //let response: snippetNews[];

  const fetchData = async () => {
    await axios
      .get(`${baseUrl}query=${language}&page=${page}`)
      .then(function (response) {
        console.log("#response16 ", response);
        setResponse(newsValues(response.data.hits, setNewsFavorited));
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
      });
  };
  //fetchData();
  //console.log("response25", response);
  useMemo(() => {
    fetchData();
  }, [language, page]);
  return response;
};
