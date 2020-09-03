import React from "react";
import Row from "./Row";

function RowsContainer(props) {
  return (
    <>
      {props.IDs.map((ID, index) => (
        <Row key={index} rowId={ID.user_id} submissions={props.submissions} />
      ))}
    </>
  );
}

export default RowsContainer;
