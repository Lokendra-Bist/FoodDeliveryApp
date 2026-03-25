import { Pagination } from "react-bootstrap";

export const PaginationControl = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      />

      {[...Array(totalPages).keys()].map((p) => (
        <Pagination.Item
          key={p}
          active={p === page}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      />
    </Pagination>
  );
};
