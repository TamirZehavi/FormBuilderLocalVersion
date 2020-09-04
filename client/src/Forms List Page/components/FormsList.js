import React, {Component, useState, useEffect} from "react";
import axios from "axios";
import Headers from "./Headers";
import TableRows from "./TableRows";
import {useHistory, Link, Redirect} from "react-router-dom";
import FormElement from "./StateTemplate";
// import {Button, Table} from "react-bootstrap";
import "./FormsList.css";

function FormsList() {
  const [forms, setForms] = useState([FormElement]);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/load_forms_list`).then((result) => {
      const forms = result.data;
      setForms(forms);
    });
  }, []);

  const enableRedirection = () => {
    setRedirect(true);
  };

  const savePreviousPage = () => {
    history.push("/");
  };

  return (
    <>
      {redirect === true ? (
        <Redirect to="/form_builder" />
      ) : (
        <div className="table-container">
          <h1>Forms List</h1>
          <table className="table table-dark m-2">
            <Headers />
            <tbody>
              <TableRows forms={forms} />
            </tbody>
          </table>
          <button
            className="btn btn-primary m-2 "
            to="/form_builder"
            onClick={() => {
              enableRedirection();
              savePreviousPage();
            }}
          >
            New Form
          </button>
        </div>
      )}
    </>
  );
}

export default FormsList;
