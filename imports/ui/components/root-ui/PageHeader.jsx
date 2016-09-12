import React, { PropTypes, Component } from "react";
import { browserHistory, Link } from 'react-router';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaSearch from 'react-icons/lib/fa/search';
import _ from 'lodash';

//SCSS files
import './root.scss';

//Custom components

export default class PageHeader extends Component {

    constructor() {
        super();
        const images = [{
            id: 0,
            name: 'bg1',
            src: '/carousel/bg1.jpg'
        },
            {
                id: 1,
                name: 'bg2',
                src: '/carousel/bg2.jpg'
            },
            {
                id: 2,
                name: 'bg3',
                src: '/carousel/bg3.jpg'
            }];
        this.state = {
            images: images,
            currentImage: _.head(images),
            openSearch: false
        };
    }

    nextImage() {
        const { images, currentImage } = this.state;
        const index = _.indexOf(images, currentImage);
        if (index < images.length - 1) {
            this.setState({
                currentImage: images[index + 1]
            });
        }
        else if (index === images.length - 1) {
            this.setState({
                currentImage: images[0]
            });
        }
    }

    prevImage() {
        const { images, currentImage } = this.state;
        const index = _.indexOf(images, currentImage);
        if (index > 0) {
            this.setState({
                currentImage: images[index - 1]
            });
        }
        else if (index === 0) {
            this.setState({
                currentImage: _.last(images)
            });
        }
    }

    toggleSearch() {
        const { openSearch } = this.state;
        this.setState({
            openSearch: !openSearch
        });
    }

    render() {
        const { currentImage, openSearch } = this.state;
        const open = openSearch ? 'open' : '';

        return (
            <div className="root-head">
                <h2 className="header-text">
                    <span>Home</span>
                    <span className="secondary-text">Town</span>
                    <div className="search-box">
                        <input className={`search-posts ${open}`} type="text" placeholder="Search..."/>
                        <FaSearch className="search-ico" onClick={this.toggleSearch.bind(this)} />
                    </div>
                </h2>
                <div className="">
                    <div className="flexible-img" style={{backgroundImage: 'url(' + currentImage.src + ')'}}>
                        <FaAngleLeft className="arrow-l" onClick={this.prevImage.bind(this)}/>
                        <FaAngleRight className="arrow-r" onClick={this.nextImage.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

PageHeader.propTypes = {
    title: PropTypes.string
};

