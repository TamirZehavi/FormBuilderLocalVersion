import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function Type(props) {
  return (
    <>
      <label>Input Type:</label>
      <select
        className="dropdown form-control controller-field"
        onChange={(e) => props.setType(e)}
      >
        <option>tel</option>
        <option>email</option>
        <option>number</option>
        <option>color</option>
        <option>date</option>
        <option>text</option>
      </select>
    </>
  );
}

export default Type;
