import React, { PropTypes } from 'react';
import debounce from 'lodash.debounce';

import '../styles/components/pinned-overlay.scss';

class PinnedOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      computedLeft: props.left,
      computedTop: props.top
    };
    this.updatePinnedLocation = debounce(this.updatePinnedLocation.bind(this), 100);
  }

  getImage(callback) {
    var image = new Image();
    image.onload = () => {
      callback(image);
    }
    image.src = window.getComputedStyle(this.props.overlaid)['background-image'].replace(/"/g,"").replace(/url\(|\)$/ig, "");
    return image;
  }

  updatePinnedLocation(image) {
    this.setState(function (prevState, props) {
      const windowWidth = document.body.clientWidth;

      // Try to get image details from previous state
      let imageWidth = prevState.imageWidth;
      let imageHeight = prevState.imageHeight;
      let aspectRatio = prevState.aspectRatio;

      if (image && (!imageWidth || !imageHeight)) {
        // Else if we have the image, get image details from it
        imageWidth = image.width;
        imageHeight = image.height;
        aspectRatio = image.width / image.height;
      }
      else {
        // Finally, get the image with this function as a callback
        this.getImage(this.updatePinnedLocation.bind(this));
        return {};
      }

      const imageScaledHeight = windowWidth / aspectRatio;
      return {
        computedLeft: props.left * (windowWidth / imageWidth),
        computedTop: props.top * (imageScaledHeight / imageHeight),
        imageWidth: imageWidth,
        imageHeight: imageHeight,
        aspectRatio: aspectRatio
      };
    });
  }

  componentDidMount() {
    this.updatePinnedLocation();
    window.addEventListener("resize", this.updatePinnedLocation);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePinnedLocation);
  }

  render() {
    return (
      <div className="pinned-overlay" style={{
        position: 'absolute',
        left: `${this.state.computedLeft}px`,
        top: `${this.state.computedTop}px`
      }}>
        {this.props.children}
      </div>
    );
  }
}

PinnedOverlay.propTypes = {
  children: PropTypes.element,
  overlaid: PropTypes.object.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired
};

export default PinnedOverlay;
