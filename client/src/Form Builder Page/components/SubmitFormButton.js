import React from "react";

function SubmitButton(props) {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        props.saveFormTemplateToDB();
      }}
      disabled={!props.formName} //must have more than one field in order to post a form
    >
      Submit
    </button>
  );
}

export default SubmitButton;
