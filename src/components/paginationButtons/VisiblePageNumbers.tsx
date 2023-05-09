import Button from '@mui/material/Button';

import PaginationProps from '../../types/paginationProps.type';

let visiblePages: any[];
let upperLimit: number;
let lowerLimit: number;
let midCeil: number;
let numOfButtonsToRight: number;
let numOfButtonsToLeft: number;

function RenderPageNumbers({ onClick, currentPage, numOfPages, maxVisible }: PaginationProps) {
  visiblePages = [];

  if (maxVisible && numOfPages && numOfPages > maxVisible) {
    midCeil = Math.ceil(maxVisible / 2);
    numOfButtonsToRight = Math.floor(maxVisible / 2);
    numOfButtonsToLeft = maxVisible % 2 === 1 ? maxVisible - midCeil : maxVisible - midCeil - 1;
    upperLimit = currentPage <= midCeil ? maxVisible : currentPage > midCeil && currentPage + midCeil < numOfPages + 1 ? currentPage + numOfButtonsToRight : numOfPages;
    lowerLimit = currentPage > numOfPages - midCeil ? numOfPages - maxVisible + 1 : currentPage <= numOfPages - midCeil && currentPage > midCeil ? currentPage - numOfButtonsToLeft : 1;
  } else {
    upperLimit = numOfPages ? numOfPages : 1;
    lowerLimit = 1;
  }

  for (let i = lowerLimit; i <= upperLimit; i++) {
    visiblePages.push(
      <span key={i} style={{ marginLeft: "2px", marginRight: "2px" }}>
        {i === currentPage ? (
          <Button variant="contained" disabled>
            {i}
          </Button>
        ) : (
          <Button
            variant="outlined"
            style={{ cursor: "pointer" }}
            onClick={() => onClick(i)}
          >
            {i}
          </Button>
        )}
      </span>
    );
  }
  return <>{visiblePages}</>;
}

export default RenderPageNumbers;
