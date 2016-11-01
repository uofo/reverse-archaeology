import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  artifacts: PropTypes.object,
  children: PropTypes.element,
  params: PropTypes.object,
};

function ArtifactThemeComponent({ artifacts, children, params }) {
  const theme = params.slug;
  const themeArtifacts = artifacts.data.items.filter((artifact) => {
    return artifact.themes && artifact.themes.includes(theme);
  });
  return (
    <div>
      Artifacts on the theme of {theme}
      <ul>
        {themeArtifacts.map((artifact) => {
          return (
            <li key={artifact.slug}>
              <Link to={'/artifacts/' + artifact.slug}>{artifact.title}</Link>
            </li>
          );
        })}
      </ul>
      {children}
    </div>
  );
}

ArtifactThemeComponent.propTypes = propTypes;

export default ArtifactThemeComponent;
