import React from "react";
import Field from "./Field";

function FieldsContainer(props) {
  return (
    <div>
      {props.fields.map((field, index) => (
        <Field key={index} field={field} />
      ))}
    </div>
  );
}

export default FieldsContainer;
