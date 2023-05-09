export default interface PaginationProps {
    onClick: (item: number) => void;
    currentPage: number;
    numOfPages?: number;
    maxVisible?: number;
}