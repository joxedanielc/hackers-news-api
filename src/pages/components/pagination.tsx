import { useState } from "react";
import { paginationReturn } from "@/utils";

export default function usePagination(
  itemsPerPage: number,
  totalRecords: number
): (page: number) => void {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(totalRecords / itemsPerPage);

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  return jump;
}
