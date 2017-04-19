import React, { PropTypes } from 'react';

import '../styles/components/slideshow.scss';

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0
    };
    this.intervalLength = 5000;
  }

  componentWillMount() {
    this.interval = setInterval(this.next.bind(this), this.intervalLength);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  nextIndex() {
    return (this.state.currentImageIndex + 1) % this.props.images.length;
  }

  next() {
    this.setState({ currentImageIndex: this.nextIndex() });
  }

  previous() {
    const newIndex = this.state.currentImageIndex - 1;
    this.setState({
      currentImageIndex: newIndex < 0 ? (this.props.images.length - 1): newIndex
    });
  }

  render() {
    const currentImage = this.props.images[this.state.currentImageIndex];
    const nextImage = this.props.images[this.nextIndex()];
    return (
      <div className="slideshow">
        <div className="slideshow-current-image" style={{ backgroundImage: `url(${currentImage.image_url})` }}></div>
        <img className="slideshow-next-image" src={nextImage.image_url} />
        <div className="slideshow-prev" onClick={this.previous.bind(this)}>&lsaquo;</div>
        <div className="slideshow-next" onClick={this.next.bind(this)}>&rsaquo;</div>
      </div>
    );
  }
}

Slideshow.propTypes = {
  images: PropTypes.array.isRequired
};

export default Slideshow;
