import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
      <div>Themes:</div>
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
  );
}

ArtifactsComponent.propTypes = propTypes;

export default ArtifactsComponent;
