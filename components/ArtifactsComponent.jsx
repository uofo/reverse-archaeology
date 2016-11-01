import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  artifacts: PropTypes.object,
  children: PropTypes.element,
};

function ArtifactsComponent({ artifacts, children }) {
  let themes = [];
  artifacts.data.items.forEach((artifact) => {
    if (!artifact.themes) return;
    themes = themes.concat(artifact.themes);
  });

  if (!themes.length) {
    return (
      <div>loading</div>
    );
  }

  themes = Array.from(new Set(themes));
  return (
    <div>
      <div>Themes:</div>
      <ul>
        {themes.map((theme) => {
          return (
            <li key={theme}>
              <Link to={'/artifacts/theme/' + theme}>{theme}</Link>
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
