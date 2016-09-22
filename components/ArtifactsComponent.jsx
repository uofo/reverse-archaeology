import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  artifacts: PropTypes.object,
  children: PropTypes.element,
};

function ArtifactsComponent({ artifacts, children }) {
  return (
    <div>
      <ul>
        {artifacts.data.items.map((artifact) => {
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

ArtifactsComponent.propTypes = propTypes;

export default ArtifactsComponent;
