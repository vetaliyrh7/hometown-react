import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactPaginate from 'react-paginate';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
// Theme components
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// CUSTOM COMPONENTS
import MainPageNews from '../components/main-page/main-page-news.jsx';
// SERVER DATA
import {
  Posts
} from '../../api';

export default class MainPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      title: 'Main Page',
      posts: props.posts,
      limit: 5
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentWillReceiveProps (props) {
    if (props.posts !== this.props.posts) {
      this.setState({
        posts: props.posts
      });
    }
  }

  handlePageClick (data) {
    const { limit } = this.state;
    this.setState({
      posts: Posts.find({type: 'News'}, {limit: limit, skip: data.selected * limit}).fetch()
    });
  }

  loadPosts (post, index) {
    return (
      <MainPageNews key={index} post={post} />
    );
  }

  renderContent () {
    const { posts, limit } = this.state;
    return (
      <div className='main-page'>
        {_.map(posts, this.loadPosts)}
        <div className='container center-align'>
          <ReactPaginate previousLabel={"<"}
            nextLabel={">"}
            breakLabel={<a href=''>...</a>}
            pageNum={this.props.postsCount / limit}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            clickCallback={this.handlePageClick.bind(this)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active-link light-blue darken-4"} />
        </div>
      </div>
    );
  }
  render() {
    return this.props.loaded
        ? this.renderContent()
        : <div className="container center-align spinned">
              <CircularProgress size={1} />
          </div>;
  }

}


MainPage.propTypes = {
  posts: PropTypes.array.isRequired,
  postsCount: PropTypes.number,
  loaded: PropTypes.bool
};

MainPage.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default createContainer(() => {
    const posts = Meteor.subscribe('posts');
    const loaded = posts.ready();
    return {
      posts: Posts.find({type: 'News'}, {limit: 5}).fetch().reverse(),
      postsCount: Posts.find().count(),
      loaded: loaded
    };
}, MainPage);
