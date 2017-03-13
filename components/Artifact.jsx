import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import DynamicContent from './DynamicContent';

import '../styles/components/artifact.scss';

const propTypes = {
  artifacts: PropTypes.object,
  children: PropTypes.element,
  params: PropTypes.object,
  themes: PropTypes.object,
};

function Artifact({ artifacts, children, params, themes }) {
  const artifactItems = artifacts.data.items;
  const artifactIndex = artifactItems.findIndex((a) => a.slug === params.slug);
  const artifact = artifactItems[artifactIndex];
  const nextArtifact = artifactItems[(artifactIndex + 1) % artifactItems.length];
  const previousArtifact = artifactItems[(artifactIndex - 1) < 0 ? artifactItems.length - 1 : artifactIndex - 1];

  let body;

  if (artifact) {
    body = (
      <div className="artifact-container">
        <Link className='previous-artifact' to={'/artifacts/' + previousArtifact.slug}></Link>
        <Link className='next-artifact' to={'/artifacts/' + nextArtifact.slug}></Link>
        <div className="artifact">
          <div className="artifact-header">
            <h2>{artifact.headline}</h2>
            <div className="artifact-header-themes">
              {artifact.themes.map((theme) => {
                return (
                  <div key={theme} className="artifact-header-theme">
                    <Link to={`/artifacts/theme/${theme}`}>
                      <img key={theme} src={`/img/themes/${theme}.png`} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="artifact-body">
            <div className="artifact-left">
              <div className="artifact-image-container">
                <div className="artifact-image" style={{
                  backgroundImage: `url("${artifact.image_url}")`,
                }}></div>
                {artifact.image_caption ? <div className='artifact-image-caption'>{artifact.image_caption}</div> : ''}
              </div>
              <div className="artifact-left-text">
                <div className="artifact-details">
                  <span className="artifact-label">Title:</span>
                  {artifact.title}
                </div>
                <div className="artifact-themes">
                  <span className="artifact-label">Themes:</span>
                  {artifact.themes.map(t => themes[t]).join(', ')}
                </div>
              </div>
            </div>
            <div className="artifact-right">
              <div className="artifact-text">
                <DynamicContent innerHTML={artifact.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {
    body = (
      <p>loading...</p>
    );
  }

  return (
    <div>
      {body}
    </div>
  );
}

Artifact.propTypes = propTypes;

export default Artifact;
