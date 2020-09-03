import React, {Component} from "react";
import FieldsContainer from "./FieldsContainer";
import "bootstrap/dist/css/bootstrap.css";
import Controller from "./Controller";
import SubmitButton from "./SubmitFormButton";
import axios from "axios";
import FormName from "./FormNameField";
import {Redirect} from "react-router-dom";

class FormBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formID: null,
      formName: "",
      fields: [],
      redirect: false,
    };
  }

  setFormName = (e) => {
    this.setState({formName: e.target.value});
  };

  createNewField = (newField) => {
    let fields = [...this.state.fields, newField];
    this.setState({fields});
  };

  saveFormTemplateToDB = () => {
    axios.defaults.baseURL = "http://localhost:5000";
    const requestBody = {
      formName: this.state.formName,
      numberOfSubmissions: 0, //a new form will always have 0 as number of submissions
    };
    axios
      .post(`/add_form_template`, requestBody) //save to form templates
      .then((response) => {
        const stateCopy = {...this.state, formID: response.data.insertId}; //synchronic
        return stateCopy;
      })
      .then((stateCopy) => {
        axios
          .post(`/add_form_fields`, stateCopy) //save to form fields
          .then((result) => {
            if (result.status === 200) {
              this.setState({redirect: true});
            }
          });
      });
  };

  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to="/" />
        ) : (
          <>
            <FieldsContainer fields={this.state.fields} />
            <Controller createNewField={this.createNewField} />
            <br />
            <FormName setFormName={this.setFormName} />
            <br />
            <SubmitButton
              formName={this.state.formName}
              saveFormTemplateToDB={this.saveFormTemplateToDB}
            />
          </>
        )}
      </div>
    );
  }
}

export default FormBuilder;
