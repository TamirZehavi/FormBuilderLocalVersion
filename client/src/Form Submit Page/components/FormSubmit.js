import React, {useEffect, useState} from "react";
import axios from "axios";
import FieldsContainer from "./FieldsContainer";
import SubmitButton from "./SubmitButton";
import FieldItem from "./FieldItem";
import {useParams, Redirect} from "react-router-dom";

export default function FormSubmitPage() {
  axios.defaults.baseURL = "http://localhost:5000";

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [fields, setFields] = useState([FieldItem]);
  const [StatusCode, setStatusCode] = useState(0);

  const {form_id} = useParams();

  //load forms into fields state from DB
  useEffect(() => {
    axios.get(`/load_form_fields/${form_id}`).then((result) => {
      const fields = result.data;
      for (let item in fields) {
        fields[item] = {...fields[item], value: "", error: ""}; //add value param to each field
      }
      setFields(fields);
    });
  }, [form_id]);

  const validateForm = () => {
    let newFields = [...fields];
    const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    for (let fieldID in fields) {
      //check all fields for errors and print out the relevant error on the screen
      const {value, field_type: inputType} = fields[fieldID];
      if (value === "") {
        newFields[fieldID].error = ""; //if field value is empty delete the error from screen and move on in the loop
        setFields(newFields);
        continue;
      }
      if (inputType === "email") {
        if (!emailRegExp.test(value)) {
          newFields[fieldID].error = "Email should include @ or .";
          setFields(newFields);
        } else {
          newFields[fieldID].error = "";
          setFields(newFields);
        }
      }
      if (inputType === "tel") {
        if (!phoneRegExp.test(value)) {
          newFields[fieldID].error = "Invalid phone";
          setFields(newFields);
        } else {
          newFields[fieldID].error = "";
          setFields(newFields);
        }
      }
    }

    //if there are still errors in some field return false
    for (let fieldID in fields) {
      if (!(fields[fieldID].error.trim() === "")) return false;
    }

    return true; //if there are no errors at all return true
  };

  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .post(`/add_user`)
        .then((response) => {
          const newFields = {
            fields: [...fields],
            userID: response.data.insertId,
          };
          return newFields;
        })
        .then((newFields) => {
          axios
            .post(`/add_form_submission`, newFields)
            .then((results) => setStatusCode(results.status))
            .then(axios.put(`/increment_submission/${form_id}`));
        });
    } else {
      return;
    }
  };

  const updateValue = (value, fieldID) => {
    let newFields = [...fields];
    const index = newFields.findIndex((field) => field.field_id === fieldID);
    newFields[index].value = value;
    setFields(newFields);
  };

  const isThereAnEpmtyInput = () => {
    const index = fields.findIndex((field) => field.value === "");
    setSubmitButtonDisabled(index === -1 ? false : true);
  };

  return (
    <>
      {StatusCode === 200 ? (
        <Redirect to="/" />
      ) : (
        <>
          <FieldsContainer
            updateValue={updateValue}
            isThereAnEpmtyInput={isThereAnEpmtyInput}
            fields={fields}
          />
          <SubmitButton
            handleSubmit={handleSubmit}
            submitButtonDisabled={submitButtonDisabled}
          />
        </>
      )}
    </>
  );
}
