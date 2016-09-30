import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactPaginate from 'react-paginate';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';

export default class NotImplemented extends Component {

    constructor (props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='main-page'>
                PAGE NOT FOUND!!! 404!! AAAAAAAAAAAAAAAA!!!
            </div>
        )
    }

}
