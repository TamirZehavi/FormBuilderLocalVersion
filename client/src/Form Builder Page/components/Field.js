import React from "react";

function Field(props) {
  const {label, inputType, inputName, placeholder} = props.field;
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        className="form-control"
        type={inputType}
        name={inputName}
        placeholder={placeholder}
        disabled={true}
      />
    </div>
  );
}

export default Field;
