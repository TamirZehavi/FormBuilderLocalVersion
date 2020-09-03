import React from "react";
import Field from "./Field";

function FieldsContainer(props) {
  return (
    <div>
      {props.fields.map((field, index) => (
        <Field
          key={index}
          id={index}
          field={field}
          updateValue={props.updateValue}
          isThereAnEpmtyInput={props.isThereAnEpmtyInput}
          validateForm={props.validateForm}
        />
      ))}
    </div>
  );
}

export default FieldsContainer;
