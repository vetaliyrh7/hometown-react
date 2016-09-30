import React, { PropTypes, Component } from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import _ from 'lodash';
import { Tracker } from 'meteor/tracker';
import Progress from './ProgressBar';
import Cropper from 'react-cropper';
import '../root-ui/cropper.css';
import ImgCropper from '../common/ImgCropper';

import { FS } from 'meteor/cfs:base-package';

import {
    Posts,
    Images, uploadImg,
    User
} from '../../../api';


class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageId: undefined,
            url: _.get(props.post, 'cover'),
            imgSteps: [],
            imgZoomSteps: [],
            stepNum: 0
        };
    }


    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.state = {
                ImageId: undefined,
                url: nextProps.post.cover,
                imgSteps: [],
                imgZoomSteps: [],
                stepNum: 0};
        }
    }

    uploadFile(ev) {
        ev.preventDefault();
        let reader = new FileReader();
        let file = ev.target.files[0];
        let self = this;

        reader.onloadend = function (event) {
            self.setState({
                file: file,
                url: this.result
            });
        };

        reader.readAsDataURL(ev.target.files[0]);
    }

    renderFileUpload() {
        return (
            <div className="postCover">
                <input type="file" placeholder="Load files"
                       onChange={this.uploadFile.bind(this)}
                       className="fileU"/>
                <Progress id={this.state.ImageId}/>
            </div>
        );
    }

    changePostTexts(textType, ev) {
        let textValue = ev.target.value;
        switch (textType) {
            case 'title':
                this.setState({title: textValue});
                break;
            case 'subtitle':
                this.setState({subtitle: textValue});
                break;
            case 'text':
                this.setState({text: textValue});
                break;
            default:
                console.log(":)");
        }
    }

    cropImg(data) {
        this.setState({
            url: data
        })
    }

    saveChanges() {

    }

    renderContent() {
        const { post } = this.props;
        const { url } = this.state;
        return (
            <div>
                <div className="data-container">
                    <div className="data-header">
                        <span className="go-back" onClick={() => this.props.history.goBack()}><MdArrowBack /></span>
                    </div>
                    <div className="image-section">
                        <ImgCropper url={url} rootClass="" toolbarClass="" saveCropped={this.cropImg.bind(this)} />
                        {this.renderFileUpload.bind(this)()}
                    </div>
                    <div className="data-text row">
                        <div className="col-xs-12 col-sm-6">
                            <b>Post title: </b>
                            <input className="form-control" type="text" placeholder="Enter post title"
                                   value={post.title}
                                   onChange={this.changePostTexts.bind(this, 'title')}/>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <b>Post subtitle: </b>
                            <input className="form-control" type="text" placeholder="Enter post subtitle"
                                   value={post.subtitle}
                                   onChange={this.changePostTexts.bind(this, 'subtitle')}/>
                        </div>
                        <div className="col-xs-12">
                            <b>Post text: </b>
                        <textarea className="form-control" type="text" placeholder="Enter post text"
                                  value={post.shortText}
                                  onChange={this.changePostTexts.bind(this, 'text')}/>
                        </div>
                    </div>
                    <div className="data-actions">
                        <RaisedButton labelColor="white" className="save"
                                      label="Save changes"
                                      onClick={this.saveChanges.bind(this)}/>
                        <RaisedButton labelColor="white" className="discard"
                                      label="Discard changes"
                                      onClick={() => this.props.history.goBack()}/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this.props.loaded
            ? this.renderContent()
            : <div className="container center-align spinned">
            <CircularProgress size={1}/>
        </div>;
    }
}

SinglePost.propTypes = {
    post: PropTypes.object,
    loaded: PropTypes.bool
};


SinglePost.childContextTypes = {
    muiTheme: PropTypes.object.isRequired
};

export default createContainer((SinglePost) => {
    const posts = Meteor.subscribe('posts');
    Meteor.subscribe('images');
    const loaded = posts.ready();

    const { postID } = SinglePost.params;

    return {
        post: Posts.findOne({_id: postID}),
        loaded: loaded
    };
}, SinglePost);
