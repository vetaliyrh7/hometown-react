import React, { PropTypes, Component } from "react";
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'lodash';
import Cropper from 'react-cropper';
import '../root-ui/cropper.css';

export default class ImgCropper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            imgSteps: [],
            imgZoomSteps: [],
            stepNum: 0,
            isEditing: false
        };
    }

    startEdit() {
        this.setState({
            isEditing: true
        })
    }

    cropImage() {
        const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
        this.props.saveCropped(dataUrl);
        this.setState({
            url: dataUrl,
            isEditing: false
        });
    }

    zoomImg(zoomVal) {
        this.refs['cropper'].zoom(zoomVal);
    }

    rotateImg(rotateVal) {
        const { imgSteps, stepNum } = this.state;
        let newSteps = imgSteps;
        let newStep = stepNum + 1;
        if(_.isEmpty(imgSteps)) {
            newSteps.push(this.refs['cropper'].getData());
        };
        this.refs['cropper'].rotate(rotateVal);
        newSteps.push(this.refs['cropper'].getData());
        let resSteps = newSteps.slice(0, newStep+1);
        this.setState({
            imgSteps: resSteps,
            stepNum: newStep
        })
    }

    undo() {
        const { imgSteps, stepNum} = this.state;
        if(stepNum > 0) {
            let newStepNum = stepNum - 1;
            this.refs['cropper'].setData(imgSteps[newStepNum]);
            this.setState({
                stepNum: newStepNum
            });
        }
    }

    redo() {
        const { imgSteps, stepNum} = this.state;
        if(stepNum < imgSteps.length-1) {
            let newStepNum = stepNum + 1;
            this.refs['cropper'].setData(imgSteps[newStepNum]);
            this.setState({
                stepNum: newStepNum
            });
        }
    }

    render() {
        const { url, isEditing } = this.state;
        const { rootClass, toolbarClass } = this.props;
        return (
            <div className={`cropper ${rootClass}`}>
                {/*CROPPER HERE*/}
                <Cropper
                    ref='cropper'
                    src={url}
                    // Cropper.js options
                    aspectRatio={NaN}
                    zoomOnWheel={true}
                    guides={false} />
                { isEditing ?  <div className={`controls ${toolbarClass}`}>
                                    <button onClick={this.cropImage.bind(this)}>Save Crop</button>
                                    <button onClick={this.zoomImg.bind(this, 0.2)}>Zoom In</button>
                                    <button onClick={this.zoomImg.bind(this, -0.2)}>Zoom Out</button>
                                    <button onClick={this.rotateImg.bind(this, -90)}>Rotate Left</button>
                                    <button onClick={this.rotateImg.bind(this, 90)}>Rotate Right</button>
                                    <button onClick={this.undo.bind(this)}>Undo</button>
                                    <button onClick={this.redo.bind(this)}>Redo</button>
                                </div>
                              : <div className="controls">
                                    <button onClick={this.startEdit.bind(this)}>Start Crop</button>
                                </div>}

            </div>
        );
    }
}

ImgCropper.propTypes = {
    url: PropTypes.string,
    rootClass: PropTypes.string,
    toolbarClass: PropTypes.string,
    saveCropped: PropTypes.func
};