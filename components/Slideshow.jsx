import React, { PropTypes } from 'react';

import '../styles/components/slideshow.scss';

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0
    };
  }

  next() {
    this.setState({
      currentImageIndex: (this.state.currentImageIndex + 1) % this.props.images.length
    });
  }

  previous() {
    const newIndex = this.state.currentImageIndex - 1;
    this.setState({
      currentImageIndex: newIndex < 0 ? (this.props.images.length - 1): newIndex
    });
  }

  render() {
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
}

Slideshow.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Slideshow;
