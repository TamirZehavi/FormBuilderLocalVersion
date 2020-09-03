import React from "react";

export default function Field(props) {
  const {
    field_id: fieldID,
    field_label: label,
    field_type: inputType,
    input_name: inputName,
    value,
    error,
  } = props.field;

  return (
    <>
      <label>{label}</label>
      <input
        maxLength={inputType === "text" ? 20 : null}
        type={inputType}
        name={inputName}
        field_id={fieldID}
        value={value || ""}
        onChange={(e) => {
          props.updateValue(e.target.value, fieldID);
          props.isThereAnEpmtyInput();
        }}
      />
      <br />
      <div style={{color: "Red"}}>{error}</div>
    </>
  );
}
