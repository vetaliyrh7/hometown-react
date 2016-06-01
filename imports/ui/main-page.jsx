import React, { PropTypes, Component } from "react";
import NavBar from "./components/nav-bar.jsx";

export default class MainPage extends Component {

  // static propTypes = {
  //   addItem: PropTypes.func.isRequired
  // };

  constructor() {
    super();
    this.state = {
      title: "Main Page"
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
