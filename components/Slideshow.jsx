import React, { PropTypes } from 'react';

import '../styles/components/slideshow.scss';

var Slideshow = React.createClass({
  propTypes: {
    images: PropTypes.array.isRequired,
  },

  getInitialState: () => {
    return {
      currentImageIndex: 0
    };
  },

  next: function () {
    this.setState({
      currentImageIndex: (this.state.currentImageIndex + 1) % this.props.images.length
    });
  },

  previous: function () {
    const newIndex = this.state.currentImageIndex - 1;
    this.setState({
      currentImageIndex: newIndex < 0 ? (this.props.images.length - 1): newIndex
    });
  },

  render: function () {
    const currentImage = this.props.images[this.state.currentImageIndex];
    return (
      <div className="slideshow">
        <div className="slideshow-current-image" style={{ backgroundImage: `url(${currentImage.image_url})` }}>
        </div>
        <div className="slideshow-prev" onClick={this.previous}>&lsaquo;</div>
        <div className="slideshow-next" onClick={this.next}>&rsaquo;</div>
      </div>
    );
  }
});

export default Slideshow;
