import { Icon } from "@iconify/react";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  Loader,
}: any) {
  const handlePageChange = (newPage: any) => {
    onPageChange(newPage);
  };

  return (
    <div className="d-flex pagination justify-content-center align-items-center">
      <button
        className="Previous"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || Loader}
      >
        <Icon icon="fe:arrow-left" />
      </button>
      <span className="Page">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="Previous"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || Loader}
      >
        <Icon icon="fe:arrow-right" />
      </button>
    </div>
  );
}
