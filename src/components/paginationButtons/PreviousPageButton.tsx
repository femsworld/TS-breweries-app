import Button from '@mui/material/Button';
import PaginationProps from '../../types/paginationProps.type';

const renderPrevButton = ({onClick, currentPage}: PaginationProps) => {
  return (
    <>
      {currentPage > 1 ? (
        <Button
            variant="outlined"
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
            onClick={() => onClick(currentPage - 1)}
        >
            <i className="fa fa-angle-left"></i>
        </Button>
      ) : (
        <Button variant="outlined" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
            <i className="fa fa-angle-left"></i>
        </Button>
      )}
    </>
  );
}
export default renderPrevButton;