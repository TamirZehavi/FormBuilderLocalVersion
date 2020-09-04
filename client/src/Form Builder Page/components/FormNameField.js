import React from "react";

function FormName(props) {
  return (
    <>
      <label>Form Name</label>
      <input
        className="form-control form-name-field"
        type="text"
        onChange={(e) => props.setFormName(e)}
      />
    </>
  );
}

export default FormName;
