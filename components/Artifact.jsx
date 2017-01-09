import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
      <div>
        <Link className='previous-artifact' to={'/artifacts/' + previousArtifact.slug}>&lsaquo;</Link>
        <Link className='next-artifact' to={'/artifacts/' + nextArtifact.slug}>&rsaquo;</Link>
        <div className="artifact">
          <h2>{artifact.headline}</h2>
          <div className="artifact-body">
            <div className="artifact-left">
              <div className="artifact-image-container">
                <div className="artifact-image" style={{
                  backgroundImage: `url("${artifact.image_url}")`,
                }}></div>
                {artifact.image_caption ? <div className='artifact-image-caption'>{artifact.image_caption}</div> : ''}
              </div>
              <div className="artifact-details">
                <div>Title: {artifact.title}</div>
              </div>
            </div>
            <div className="artifact-right">
              <div className="artifact-text">
                <div dangerouslySetInnerHTML={{__html: decode(artifact.content)}} />
              </div>
              <div className="artifact-more">
                Learn More
              </div>
              <div className="artifact-themes">
                Themes: {artifact.themes.map(t => themes[t]).join(', ')}
              </div>
              <div className="artifact-subthemes">
                Subthemes
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
