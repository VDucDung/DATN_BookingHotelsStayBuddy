export interface PaginationProps {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onPageChange: (data: { selected: number }) => void;
  forcePage?: number;
  previousLabel?: string;
  nextLabel?: string;
  breakLabel?: string;
  className?: string;
  buttonWidth?: string;
  buttonHeight?: string;
  buttonClassName?: string;
  labelClassName?: string;
  previousComponent?: React.ComponentType;
  nextComponent?: React.ComponentType;
  firstLabel?: string;
  lastLabel?: string;
  firstComponent?: React.ComponentType;
  lastComponent?: React.ComponentType;
}
