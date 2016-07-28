import React, { PropTypes, Component } from "react";
// CUSTOM COMPONENTS

export default class FilmsPage extends Component {

  // static propTypes = {
  //   addItem: PropTypes.func.isRequired
  // };

  constructor() {
    super();
    this.state = {
      title: "Films & Theatres"
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
