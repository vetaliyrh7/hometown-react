import React, { PropTypes, Component } from "react";
// CUSTOM COMPONENTS
import NavBar from "../components/nav-bar.jsx";
import Footer from "../components/footer.jsx";

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
        <NavBar title={this.state.title} />
        This is {this.state.title}
        <Footer />
      </div>
    );
  }
}
