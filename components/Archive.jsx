import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import debounce from 'lodash.debounce';

import '../styles/components/archive.scss';

class PinnedOverlay extends React.Component {
  constructor(props) {
    super(props);

    var image = new Image();
    image.src = window.getComputedStyle(this.props.overlaid)['background-image'].replace(/"/g,"").replace(/url\(|\)$/ig, "");

    this.imageWidth = image.width;
    this.imageHeight = image.height;
    this.aspectRatio = this.imageWidth / this.imageHeight;

    this.state = {
      computedLeft: props.left,
      computedTop: props.top
    };

    this.updatePinnedLocation = debounce(this.updatePinnedLocation, 100);
  }

  updatePinnedLocation() {
    const windowWidth = document.body.clientWidth;
    const imageScaledHeight = windowWidth / this.aspectRatio;
    this.setState(function (prevState, props) {
      return {
        computedLeft: props.left * (windowWidth / this.imageWidth),
        computedTop: props.top * (imageScaledHeight / this.imageHeight)
      };
    });
  }

  componentDidMount() {
    this.updatePinnedLocation();
    window.addEventListener("resize", this.updatePinnedLocation.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePinnedLocation.bind(this));
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

function ThemeButton({ slug, theme }) {
  return (
    <div className="theme-button">
      <Link to={`/artifacts/theme/${slug}`}>
        <div className="theme-button-inactive">
          <img src={`/img/${slug}.png`} />
        </div>
        <div className="theme-button-active">
          <div className="theme-button-label">{theme}</div>
        </div>
      </Link>
    </div>
  )
};

ThemeButton.propTypes = {
  slug: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};

function Archive({ children, themes }) {
  const themeSlugs = Object.keys(themes);

  if (!themeSlugs.length) {
    return (
      <div>loading</div>
    );
  }

  const positions = {
    'corner-good-hope': [485, 450],
    'crossroads': [830, 670],
    'history-us-cities': [490, 670],
    'industry-and-infrastructure': [830, 260],
    'lifecycle': [1160, 670],
    'nostalgia': [830, 460],
  };

  return (
    <div>
      <div className="archive">
        <div className="archive-screen">
          <div className="archive-blurb">
            <h2>The Archive</h2>
            <div>About the archive</div>
          </div>
          <ul>
            {themeSlugs.map((slug) => {
              const position = positions[slug];
              return (
                <PinnedOverlay key={slug} overlaid={document.body} left={position[0]} top={position[1]}>
                  <ThemeButton slug={slug} theme={themes[slug]} />
                </PinnedOverlay>
              );
            })}
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
}

Archive.propTypes = {
  children: PropTypes.element,
  themes: PropTypes.object,
};

export default Archive;
