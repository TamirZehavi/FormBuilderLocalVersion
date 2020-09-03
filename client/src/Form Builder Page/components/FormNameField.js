import React from "react";

function FormName(props) {
  return (
    <>
      <label>Form Name</label>
      <input type="text" onChange={(e) => props.setFormName(e)} />
    </>
  );
}

export default FormName;
