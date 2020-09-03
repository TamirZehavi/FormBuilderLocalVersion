import React from "react";

function Row(props) {
  return (
    <>
      <tr id={props.rowId}>
        <td>{props.rowId}</td>
        {props.submissions
          .filter((submission) => submission.user_id === props.rowId)
          .map((tableData, index) => (
            <td key={index}>{tableData.value}</td>
          ))}
      </tr>
    </>
  );
}

export default Row;
