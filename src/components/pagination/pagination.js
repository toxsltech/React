import React from "react";
import ReactPaginate from "react-paginate";
export default function Pagination(props) {
  return (
    <div>
      {props.page ? (
        <ReactPaginate
          previousLabel={"←Previous"}
          nextLabel={"Next→"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={props.page}
          initialPage={0}
          marginPagesDisplayed={5}
          onPageChange={(data) => props.handlePageClick(data)}
          containerClassName={"pagination m-0"}
          subContainerClassName={"pages pagination"}
          pageClassName="page-item"
          activeClassName={"active"}
          activeLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          nextClassName={"page-link arrow text-danger"}
          previousLinkClassName={"page-link arrow"}
          disableInitialCallback={true}
        />
      ) : (
        ""
      )}
    </div>
  );
}
