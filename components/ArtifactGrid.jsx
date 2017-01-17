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
    const headline = artifact.headline;
    const width = (headline && headline.length) > 90 ? 'wide': 'narrow';
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
  return (
    <div>
      <ul className="artifact-grid">
        {artifacts.map((artifact) => {
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
