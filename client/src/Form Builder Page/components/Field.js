import React from "react";

function Field(props) {
  const {label, inputType, inputName, placeholder} = props.field;
  return (
    <div>
      <label>{label}</label>
      <input
        type={inputType}
        name={inputName}
        placeholder={placeholder}
        disabled={true}
      />
    </div>
  );
}

export default Field;
