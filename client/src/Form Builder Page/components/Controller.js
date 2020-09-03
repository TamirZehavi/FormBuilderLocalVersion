import React, {Component} from "react";
import Type from "./TypeOfField";

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
        <div>
          <button
            onClick={() => this.props.createNewField(this.state)}
            disabled={
              (!this.state.label && !this.state.inputName) ||
              (!this.state.label && this.state.inputName) ||
              (this.state.label && !this.state.inputName)
            } //label and name should always have values
          >
            Add Field
          </button>
          <Type
            setType={(e) => {
              this.setType(e.target.value);
            }}
          />
        </div>

        <input
          type="text"
          placeholder="input name here"
          onChange={(e) => {
            this.setInputName(e.target.value);
          }}
          maxLength={20}
        />

        <input
          type="text"
          placeholder="label here"
          onChange={(e) => {
            this.setLabel(e.target.value);
          }}
          maxLength={20}
        />
      </div>
    );
  }
}

export default Controller;
