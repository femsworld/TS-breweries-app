// import React from 'react';
import Button from '@mui/material/Button';

import PaginationProps from '../../types/paginationProps.type';

const renderFirstButton = ({ onClick, currentPage }: PaginationProps) => {
  return (
    <>
      {currentPage > 1 ? (
        <Button
          variant="outlined"
          style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
          onClick={() => onClick(1)}
        >
          <i className="fa fa-angle-double-left"></i>
        </Button>
      ) : (
        <Button variant="outlined" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
          <i className="fa fa-angle-double-left"></i>
        </Button>
      )}
    </>
  );
};

export default renderFirstButton;
