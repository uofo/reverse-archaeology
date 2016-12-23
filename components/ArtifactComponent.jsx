import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/artifact.scss';

const propTypes = {
  artifacts: PropTypes.object,
  children: PropTypes.element,
  params: PropTypes.object,
};

function ArtifactComponent({ artifacts, children, params }) {
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
          <div>
            <div className="artifact-left">
              {artifact.image_url ? <img className='artifact-image' src={artifact.image_url} /> : ''}
              {artifact.image_caption ? <div className='artifact-image-caption'>{artifact.image_caption}</div> : ''}
            </div>
            <div className="artifact-right">
              <div dangerouslySetInnerHTML={{__html: decode(artifact.content)}} />
            </div>
            <div style={{clear: 'both'}}></div>
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

ArtifactComponent.propTypes = propTypes;

export default ArtifactComponent;
