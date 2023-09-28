import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
function Paging({ setPage, handleChangeRowsPerPage, page }) {
  const nextpage = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };
  const prevpage = (e) => {
    e.preventDefault();
    page === 1 ? setPage(page - 0) : setPage(page - 1);
  };
  return (
    <div className="pge">
      <div className="determine-page">
        <div>
          <label>Rows per page: </label>
          <select
            id="rowpages"
            name="rowpages"
            onChange={(e) => handleChangeRowsPerPage(e)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
        <div className="determine-page-page">
          <label>Page {page}</label>
          <ChevronLeftIcon onClick={(e) => prevpage(e)} className="iconss" />
          <ChevronRightIcon onClick={(e) => nextpage(e)} className="iconss" />
        </div>
      </div>
    </div>
  );
}

export default Paging;
