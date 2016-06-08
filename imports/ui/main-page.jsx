import React, { PropTypes, Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import ReactPaginate from 'react-paginate'
import _ from 'lodash'
// CUSTOM COMPONENTS
import NavBar from './components/nav-bar.jsx'
import MainPageNews from './components/main-page-news.jsx'
import Footer from './components/footer.jsx'
// SERVER DATA
import { Posts } from '../api/posts.js'

export default class MainPage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      title: 'Main Page',
      posts: props.posts,
      limit: 5
    }
  }

  componentWillReceiveProps (props) {
    if (props.posts !== this.props.posts) {
      this.setState({
        posts: props.posts
      })
    }
  }

  handlePageClick (data) {
    const { limit } = this.state;
    this.setState({
      posts: Posts.find({type: 'News'}, {limit: limit, skip: data.selected * limit}).fetch()
    })
  }

  loadPosts (post, index) {
    return (
      <MainPageNews key={index} post={post} />
    )
  }

  render () {
    const { posts, limit } = this.state
    return (
      <div className='main-page'>
        <NavBar title={this.state.title} />
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
        <Footer />
      </div>
    )
  }
}

MainPage.propTypes = {
  posts: PropTypes.array.isRequired,
  postsCount: PropTypes.number
}

export default createContainer(() => {
  return {
    posts: Posts.find({type: 'News'}, {limit: 5}).fetch(),
    postsCount: Posts.find().count()
  }
}, MainPage)
