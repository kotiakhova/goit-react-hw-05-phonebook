import React from "react";

export default function Filter({ onHandleFilter }) {
  return (
    <>
      <div>
        <p>Find contacts by name</p>
        <input name="filter" type="text" onChange={(e) => onHandleFilter(e)} />
      </div>
    </>
  );
}
