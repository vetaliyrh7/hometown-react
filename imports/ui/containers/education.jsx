import React, { PropTypes, Component } from "react";
import NavBar from "../components/nav-bar.jsx";

export default class EducationPage extends Component {

  // static propTypes = {
  //   addItem: PropTypes.func.isRequired
  // };

  constructor() {
    super();
    this.state = {
      title: "Education"
    }
  }

  render() {
    return(
      <div className="main-page">
        <NavBar title={this.state.title} />
        This is {this.state.title}
      </div>
    )
  }
}
