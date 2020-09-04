import React, {Component} from "react";
import Type from "./TypeOfField";
import "bootstrap/dist/css/bootstrap.css";

class Controller extends Component {
  state = {
    label: "",
    inputType: "tel",
    inputName: "",
    placeholder: "enter tel here",
    nameAndLabelEmpty: true,
  };

  setType = (type) => {
    this.setState({
      inputType: type,
      placeholder: `enter ${type} here`,
    });
  };

  setLabel = (label) => {
    this.setState({label});
  };

  setInputName = (name) => {
    this.setState({inputName: name});
  };

  render() {
    return (
      <div>
        <div className="controller-container">
          <h4>Add Fields To Your Form</h4>
          <div>
            <Type
              setType={(e) => {
                this.setType(e.target.value);
              }}
            />
          </div>

          <input
            className="form-control controller-field"
            type="text"
            placeholder="input name here"
            onChange={(e) => {
              this.setInputName(e.target.value);
            }}
            maxLength={20}
          />

          <input
            className="form-control controller-field"
            type="text"
            placeholder="label here"
            onChange={(e) => {
              this.setLabel(e.target.value);
            }}
            maxLength={20}
          />
          <button
            className="btn btn-primary add-form-template-button"
            onClick={() => this.props.createNewField(this.state)}
            disabled={
              (!this.state.label && !this.state.inputName) ||
              (!this.state.label && this.state.inputName) ||
              (this.state.label && !this.state.inputName)
            } //label and name should always have values
          >
            Add Field
          </button>
        </div>
      </div>
    );
  }
}

export default Controller;
