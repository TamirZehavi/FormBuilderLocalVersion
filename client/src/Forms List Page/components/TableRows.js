import React from "react";
import {Link} from "react-router-dom";

function TableRows(props) {
  return props.forms.map((form, index) => {
    const {id, name, submissions} = form;
    return (
      <tr key={index}>
        <td>{id}</td>
        <td>{name}</td>
        <td>
          <Link to={`/form_submit/${id}`}>Submit</Link>
        </td>
        <td>
          <Link to={`/form_submissions/${id}`}>Link</Link>
        </td>
        <td>{submissions}</td>
      </tr>
    );
  });
}

export default TableRows;
