import React, { PropTypes } from 'react';
import Dimensions from 'react-dimensions'
import { Link } from 'react-router';

import DynamicContent from './DynamicContent';
import PinnedOverlay from './PinnedOverlay';

import '../styles/components/archive.scss';

function ThemeButton({ slug, theme }) {
  return (
    <div className="theme-button">
      <Link to={`/artifacts/theme/${slug}`}>
        <div className="theme-button-inactive">
          <img src={`/img/themes/${slug}.png`} />
        </div>
        <div className="theme-button-active">
          <img src={`/img/themes/${slug}-active.png`} />
          <div className="theme-button-label">{theme}</div>
          <div className="header-separator"></div>
        </div>
      </Link>
    </div>
  )
};

ThemeButton.propTypes = {
  slug: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};

const positions = {
  tablet: {
    'corner-good-hope': [120, 175],
    'crossroads': [120, 550],
    'history-us-cities': [120, 900],
    'industry-and-infrastructure': [120, 1300],
    'lifecycle': [120, 1650],
    'nostalgia': [120, 2020],
  },
  phone: {
    'corner-good-hope': [120, 250],
    'crossroads': [120, 620],
    'history-us-cities': [120, 950],
    'industry-and-infrastructure': [120, 1350],
    'lifecycle': [120, 1750],
    'nostalgia': [120, 2100],
  },
  default: {
    'corner-good-hope': [485, 450],
    'crossroads': [820, 670],
    'history-us-cities': [490, 670],
    'industry-and-infrastructure': [820, 260],
    'lifecycle': [1160, 670],
    'nostalgia': [820, 460],
  }
};

class Archive extends React.Component {
  render() {
    const themeSlugs = Object.keys(this.props.themes);

    if (!themeSlugs.length) {
      return (
        <div>loading</div>
      );
    }

    let blurb;
    if (this.props.blurbs) {
      blurb = this.props.blurbs.filter(blurb => blurb.page === 'archive')[0];
    }

    // const windowWidth = document.body.clientWidth;
    const windowWidth = this.props.containerWidth + 50;
    let themePositions = positions.default;
    if (windowWidth <= 1024) {
      themePositions = positions.tablet;
    }
    if (windowWidth <= 767) {
      themePositions = positions.phone;
    }

    return (
      <div style={{ paddingTop: '100px' }}>
        <div className="archive">
          <div className="archive-screen">
            <div className="archive-blurb">
              <h2>The Archive</h2>
              <div>
                <div className="header-separator"></div>
                {blurb ?
                  <DynamicContent innerHTML={blurb.content} /> :
                  null}
              </div>
            </div>
            <ul>
              {themeSlugs.map((slug) => {
                const position = themePositions[slug];
                return (
                  <PinnedOverlay key={slug} overlaid={document.body} left={position[0]} top={position[1]}>
                    <ThemeButton slug={slug} theme={this.props.themes[slug]} />
                  </PinnedOverlay>
                );
              })}
            </ul>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Archive.propTypes = {
  blurbs: PropTypes.array,
  children: PropTypes.element,
  containerWidth: PropTypes.number,
  themes: PropTypes.object,
};

export default Dimensions()(Archive);
