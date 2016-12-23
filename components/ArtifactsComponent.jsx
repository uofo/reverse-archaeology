import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/archive.scss';

const propTypes = {
  children: PropTypes.element,
  themes: PropTypes.object,
};

function ArtifactsComponent({ children, themes }) {
  const themeSlugs = Object.keys(themes);

  if (!themeSlugs.length) {
    return (
      <div>loading</div>
    );
  }

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
              return (
                <li key={slug}>
                  <Link to={'/artifacts/theme/' + slug}>{themes[slug]}</Link>
                </li>
              );
            })}
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
}

ArtifactsComponent.propTypes = propTypes;

export default ArtifactsComponent;
