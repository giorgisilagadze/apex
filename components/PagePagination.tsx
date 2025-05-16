"use client";

import Pagination, { ReactPaginateProps } from "react-paginate";

import styles from "./AppPagination.module.scss";
import { BsArrowDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import { ScrollToTop } from "@/hooks/ScrollToTop";
const ReactPaginate = Pagination as any;

interface Prop {
  dataLength: number;
  itemsPerPage: number;
  children: React.ReactNode;
  both: boolean;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  onClick?: (page: number) => void;
}

export default function PagePagination({
  dataLength,
  itemsPerPage,
  children,
  both,
  currentPage,
  setCurrentPage,
  onClick,
}: Prop) {
  const pageCount = dataLength ? Math.ceil(dataLength / itemsPerPage) : 0;

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);

    localStorage.setItem("currentCarPage", JSON.stringify(event.selected + 1));
    onClick?.(event.selected);
  };

  const handleNextPage = () => {
    if (currentPage + 1 < Math.ceil(dataLength / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {both && (
        <ReactPaginate
          breakLabel="..."
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          breakLinkClassName={"font-bold text-gray-400"}
          breakClassName={"w-8 h-8 flex items-center justify-center"}
          containerClassName={`flex items-center gap-1`}
          pageLinkClassName={`w-8 h-8 text-md flex items-center justify-center rounded-[50%] hover:bg-blue duration-200 ml-1 hover:text-white`}
          previousLinkClassName={`hidden`}
          nextLinkClassName={`hidden`}
          activeLinkClassName={"bg-blue text-white"}
          onPageChange={handlePageClick}
          forcePage={currentPage}
        />
      )}

      <div className="w-full">{children}</div>

      <div className="flex items-center md500:gap-[60px] gap-[40px] mt-4">
        {pageCount > 1 && (
          <div
            className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-black cursor-pointer hover:border-blue hover:text-blue duration-300"
            onClick={handlePrevPage}
          >
            <BsArrowDown className="mr-[-20px] text-[26px] rotate-90" />
          </div>
        )}

        {pageCount > 1 && (
          <ReactPaginate
            breakLabel="..."
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            breakLinkClassName={"font-bold text-gray-400"}
            breakClassName={"w-8 h-8 flex items-center justify-center "}
            containerClassName={`flex items-center gap-1`}
            pageLinkClassName={`w-8 h-8 text-md flex items-center justify-center rounded-[50%] hover:bg-blue duration-200 ml-1 hover:text-white`}
            previousLinkClassName={`hidden`}
            nextLinkClassName={`hidden`}
            activeLinkClassName={"bg-blue text-white"}
            onPageChange={handlePageClick}
            forcePage={currentPage}
          />
        )}
        {pageCount > 1 && (
          <div
            className="flex items-center justify-center w-[32px] h-[32px] rounded-[50%] border border-black cursor-pointer hover:border-blue hover:text-blue duration-300"
            onClick={handleNextPage}
          >
            <BsArrowDown className=" ml-[-20px] text-[26px] -rotate-90" />
          </div>
        )}
      </div>
    </>
  );
}
