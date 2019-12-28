import React from "react";

function Search(props) {
  return (
    <div className="mt-5 row">
      <div className="col-md-10">
        <input
          type="text"
          className="form-control search"
          placeholder="Search for todo"
          value = {props.searchText}
          onChange = {e => props.setSearchText(e.target.value)}
          name = "searchText"
        />
      </div>
    </div>
  );
}

export default Search;
