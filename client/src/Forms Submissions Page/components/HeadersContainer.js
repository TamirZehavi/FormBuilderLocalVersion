import React from "react";
import Headers from "./Headers";

function HeadersContainer(props) {
  return (
    <>
      <tr>
        <th>submission ID</th>
        {props.headers.map((header, index) => (
          <Headers key={index} headerName={header.input_name} />
        ))}
      </tr>
    </>
  );
}

export default HeadersContainer;
