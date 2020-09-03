import React from "react";

function SubmitButton(props) {
  return (
    <button onClick={props.handleSubmit} disabled={props.submitButtonDisabled}>
      Submit Form
    </button>
  );
}

export default SubmitButton;
