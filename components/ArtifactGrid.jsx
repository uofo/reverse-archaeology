import React, { PropTypes } from 'react';

import '../styles/components/artifact-grid.scss';

const allowedThemes = [
  'corner-good-hope',
  'crossroads',
  'history-us-cities',
  'industry-and-infrastructure',
  'lifecycle',
  'nostalgia',
];

function artifactIsNarrow(artifact) {
  return artifact.headline && artifact.headline.length <= 90;
}

var ArtifactGridItem = React.createClass({
  propTypes: {
    artifact: PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  onClick: function () {
    this.context.router.push('/artifacts/' + this.props.artifact.slug);
  },

  render: function () {
    const artifact = this.props.artifact;
    const width = artifactIsNarrow(artifact) ? 'narrow': 'wide';
    const imageUrl = (artifact.image_thumbnail_url
        ? artifact.image_thumbnail_url
        : artifact.image_url);
    const themes = artifact.themes.filter(t => allowedThemes.indexOf(t) >= 0);
    return (
      <li className={"artifact-grid-item-" + width} onClick={this.onClick} style={{backgroundImage: "url('" + imageUrl + "')"}}>
        <div className="artifact-grid-item-inner">
          <div className="artifact-grid-themes">
            {themes.map((theme) => {
              return (
                <div key={theme} className="artifact-grid-theme">
                  <img key={theme} src={`/img/themes/${theme}-active.png`} />
                </div>
              );
            })}
            <div style={{ clear: 'both' }}></div>

          </div>
          <div className="artifact-grid-item-inner-text">
            {artifact.headline}
          </div>
          <div className="header-separator"></div>
        </div>
      </li>
    );
  }
});

function ArtifactGrid({ artifacts }) {
  const gridWidth = 3;
  const wideWidth = 2;
  const narrowWidth = 1;

  function sortArtifacts(artifacts) {
    // Divide artifacts into narrow and wide
    let sortedArtifacts = [];
    let narrowArtifacts = [];
    let wideArtifacts = [];
    artifacts.forEach((artifact) => {
      if (artifactIsNarrow(artifact)) {
        narrowArtifacts.push(artifact);
      }
      else {
        wideArtifacts.push(artifact);
      }
    });

    // Put the artifacts in an order that will make them look good when put in a
    // grid. Randomly pick narrow artifacts over wide sometimes, but skew toward
    // wide to ensure that the grid fills up more often than not.
    let mod = 0;
    while (narrowArtifacts.length || wideArtifacts.length) {
      if ((mod === 0 || mod === 1) && wideArtifacts.length && Math.random() < 0.7) {
        sortedArtifacts.push(wideArtifacts.pop());
        mod = (mod + wideWidth) % gridWidth;
      }
      else if (narrowArtifacts.length) {
        sortedArtifacts.push(narrowArtifacts.pop());
        mod = (mod + narrowWidth) % gridWidth;
      }
    }
    return sortedArtifacts;
  }

  return (
    <div>
      <ul className="artifact-grid">
        {sortArtifacts(artifacts).map((artifact) => {
          return <ArtifactGridItem artifact={artifact} key={artifact.slug} />;
        })}
      </ul>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
}

export {
  ArtifactGrid,
};
