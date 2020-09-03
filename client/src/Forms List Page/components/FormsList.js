import React, {Component} from "react";
import axios from "axios";
import Headers from "./Headers";
import TableRows from "./TableRows";
import {Redirect} from "react-router-dom";
import FormElement from "./StateTemplate";
import {Button, Table} from "react-bootstrap";
import "./FormsList.css";

class FormsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [FormElement],
      redirect: false,
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/load_forms_list`).then((result) => {
      const forms = result.data;
      this.setState({forms: forms});
    });
  }

  enableRedirection = () => {
    this.setState({redirect: true});
  };

  render() {
    return (
      <>
        {this.state.redirect === true ? (
          <Redirect to="/form_builder" />
        ) : (
          <div className="table-container">
            <h1>Forms List</h1>
            <Table className="table table-dark m-2">
              <Headers />
              <tbody>
                <TableRows forms={this.state.forms} />
              </tbody>
            </Table>
            <Button
              className="m-2"
              to="/form_builder"
              onClick={this.enableRedirection}
            >
              New Form
            </Button>
          </div>
        )}
      </>
    );
  }
}

export default FormsList;
