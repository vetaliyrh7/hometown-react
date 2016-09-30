import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';
import ReactPaginate from 'react-paginate';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import _ from 'lodash';
// Theme components
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// SERVER DATA
import {
  Posts,
  Images, uploadImg
} from '../../../api';

class PostsList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      title: 'Main Page',
      posts: props.posts,
      limit: 15
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
		<ListItem key={index} primaryText={post.title} className="black-text"
							onClick={() => browserHistory.push("/dashboard/posts/" + post._id)} />
    );
  }

  renderContent () {
    const { posts, limit } = this.state;
    return (
      <div className=''>
        <List>
            {_.map(posts, this.loadPosts)}
        </List>
        <div className='container center-align'>
          <ReactPaginate previousLabel={"<"}
            nextLabel={">"}
            breakLabel={<a href=''>...</a>}
            pageNum={this.props.postsCount / limit}
            marginPagesDisplayed={2}
            pageRangeDisplayed={15}
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


PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  postsCount: PropTypes.number,
  loaded: PropTypes.bool
};

PostsList.childContextTypes = {
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
}, PostsList);
