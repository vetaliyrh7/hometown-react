import React, { PropTypes, Component } from "react";
// CUSTOM COMPONENTS

export default class SightsPage extends Component {

  // static propTypes = {
  //   addItem: PropTypes.func.isRequired
  // };

  constructor() {
    super();
    this.state = {
      title: "Sights"
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
