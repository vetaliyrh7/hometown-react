import React, {PropTypes, Component} from "react";

export default class Footer extends Component {

  render() {
    return (
      <footer className="page-footer light-blue darken-2">
        <div className="container">
          <div className="row">
            <div className="col l8 s12">
              <h5 className="white-text">Contact info</h5>
              <p className="grey-text text-lighten-4">We created Gitter chat-room so you could speak directly with Hometown developers. We are ready to hear your ideas and feedbacks!</p>
              <a className="btn waves-effect waves-light light-blue darken-4" target="_blank" href="https://gitter.im/vetaliyrh7/hometown">Go to chat-room!</a>
            </div>
            <div className="col l4 s12 hidden-overflow">
              <h5 className="white-text">Additional project info</h5>
              <iframe className="borderless" src="http://ghbtns.com/github-btn.html?user=vetaliyrh7&amp;repo=hometown-react&amp;type=watch&amp;count=true&amp;size=large" allowtransparency="true" frameborder="0" scrolling="0" width="170" height="30"></iframe>
            </div>
          </div>
        </div>
        <div className="footer-copyright light-blue darken-4">
          <div className="container">© 2016 Hometown, All rights reserved.
            <a className="grey-text text-lighten-4 right" href="https://facebook.github.io/react/">Powered by
              <b className="link-text"> React</b>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
