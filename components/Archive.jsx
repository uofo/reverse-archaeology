import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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

function Archive({ blurbs, children, themes }) {
  const themeSlugs = Object.keys(themes);

  if (!themeSlugs.length) {
    return (
      <div>loading</div>
    );
  }

  const positions = {
    'corner-good-hope': [485, 450],
    'crossroads': [820, 670],
    'history-us-cities': [490, 670],
    'industry-and-infrastructure': [820, 260],
    'lifecycle': [1160, 670],
    'nostalgia': [820, 460],
  };

  let blurb;
  if (blurbs) {
    blurb = blurbs.filter(blurb => blurb.page === 'archive')[0];
  }

  return (
    <div>
      <div className="archive">
        <div className="archive-screen">
          <div className="archive-blurb">
            <h2>The Archive</h2>
            <div>
              <div className="header-separator"></div>
              {blurb ?
                <div dangerouslySetInnerHTML={{__html: decode(blurb.content)}} /> :
                null}
            </div>
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
  blurbs: PropTypes.array,
  children: PropTypes.element,
  themes: PropTypes.object,
};

export default Archive;
