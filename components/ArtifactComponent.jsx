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
        <h2>{artifact.title}</h2>
        <div dangerouslySetInnerHTML={{__html: decode(artifact.content)}} />
        <Link className='previous-artifact' to={'/artifacts/' + previousArtifact.slug}>previous</Link>
        <Link className='next-artifact' to={'/artifacts/' + nextArtifact.slug}>next</Link>
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
