import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { ArtifactGrid } from './ArtifactGrid';

import '../styles/components/artifact-theme.scss';

const propTypes = {
  artifacts: PropTypes.object,
  children: PropTypes.element,
  params: PropTypes.object,
  themes: PropTypes.object,
};

function ArtifactTheme({ artifacts, children, params, themes }) {
  const theme = params.slug;
  const themeArtifacts = artifacts.data.items.filter((artifact) => {
    return artifact.themes && artifact.themes.includes(theme);
  });
  return (
    <div className="artifact-grid-container">
      <h2 className="artifact-theme">{themes[theme]}</h2>
      <ArtifactGrid artifacts={themeArtifacts} />
      {children}
      <div style={{clear: 'both'}}></div>
    </div>
  );
}

ArtifactTheme.propTypes = propTypes;

export default ArtifactTheme;
