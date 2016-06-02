import React, { PropTypes, Component } from "react";
import NavBar from "../components/nav-bar.jsx";
// CUSTOM COMPONENTS
import Footer from "../components/footer.jsx";

export default class FilmsPage extends Component {

  // static propTypes = {
  //   addItem: PropTypes.func.isRequired
  // };

  constructor() {
    super();
    this.state = {
      title: "Films & Theatres"
    }
  }

  render() {
    return(
      <div className="main-page">
        <NavBar title={this.state.title} />
        This is {this.state.title}
        <Footer />
      </div>
    )
  }
}