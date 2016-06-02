import React, { PropTypes, Component } from "react";
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
// CUSTOM COMPONENTS
import NavBar from "./components/nav-bar.jsx";
import MainPageNews from "./components/main-page-news.jsx";
import Footer from "./components/footer.jsx";
// SERVER DATA
import { Posts } from "../api/posts.js";

export default class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "Main Page",
      posts: props.posts
    }
  }

  componentWillReceiveProps(props) {
    if (props.posts !== this.props.posts)
      this.setState({
          posts: props.posts
      });
    }

  loadPosts(post, index) {
    return(
      <MainPageNews key={index} post={post}/>
    )
  }

  render() {
    return(
      <div className="main-page">
        <NavBar title={this.state.title} />
        {_.map(this.state.posts, this.loadPosts)}
        <Footer />
      </div>
    )
  }
}

MainPage.propTypes = {
  posts: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    posts: Posts.find({type: "News"}).fetch()
  };
}, MainPage);
