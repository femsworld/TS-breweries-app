import Button from '@mui/material/Button';
import PaginationProps from '../../types/paginationProps.type';

const renderNextButton = ({onClick, currentPage, numOfPages}: PaginationProps) => {
  return (
    <>
      {numOfPages && currentPage < numOfPages ? (
        <Button
            variant="outlined"
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
            onClick={() => onClick(currentPage + 1)}
        >
            <i className="fa fa-angle-right"></i>
        </Button>
      ) : (
        <Button variant="outlined" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
            <i className="fa fa-angle-right"></i>
        </Button>
      )}
    </>
  );
}
export default renderNextButton;