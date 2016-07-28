import React, { PropTypes, Component } from "react";
// CUSTOM COMPONENTS

export default class EducationPage extends Component {

  // static propTypes = {
  //   addItem: PropTypes.func.isRequired
  // };

  constructor() {
    super();
    this.state = {
      title: "Education"
    };
  }

  render() {
    return(
      <div className="main-page">
        This is {this.state.title}
      </div>
    );
  }
}
