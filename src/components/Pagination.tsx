// import React from 'react';
import { Stack } from '@mui/material';
import FirstPageButton from './paginationButtons/FirstPageButton';
import PreviousPageButton from './paginationButtons/PreviousPageButton';
import NextPageButton from './paginationButtons/NextPageButton';
import LastPageButton from './paginationButtons/LastPageButton';
import VisiblePageNumbers from './paginationButtons/VisiblePageNumbers';
import PaginationProps from '../types/paginationProps.type';

function Pagination({ onClick, currentPage, numOfPages, maxVisible }: PaginationProps) {
  return (
    <Stack direction="row">
      <FirstPageButton onClick={onClick} currentPage={currentPage} />
      <PreviousPageButton onClick={onClick} currentPage={currentPage} />
      {maxVisible && numOfPages && currentPage > Math.ceil(maxVisible / 2) && numOfPages > maxVisible && (
        <span style={{ marginLeft: "2px", marginRight: "2px" }}>...</span>
      )}
      <VisiblePageNumbers onClick={onClick} currentPage={currentPage} numOfPages={numOfPages} maxVisible={maxVisible} />
      {maxVisible && numOfPages && maxVisible % 2 === 1 ? (
        currentPage <= numOfPages - Math.ceil(maxVisible / 2) && numOfPages > maxVisible && (
          <span style={{ marginLeft: "2px", marginRight: "2px" }}>...</span>
        )
      ) : (
        maxVisible && numOfPages && currentPage < numOfPages - Math.ceil(maxVisible / 2) && numOfPages > maxVisible && (
          <span style={{ marginLeft: "2px", marginRight: "2px" }}>...</span>
        )
      )}
      <NextPageButton onClick={onClick} currentPage={currentPage} numOfPages={numOfPages} />
      <LastPageButton onClick={onClick} currentPage={currentPage} numOfPages={numOfPages} />
    </Stack>
  );
}

export default Pagination;
