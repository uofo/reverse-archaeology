import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  artifacts: PropTypes.object,
  children: PropTypes.element,
  params: PropTypes.object,
  themes: PropTypes.object,
};

function ArtifactThemeComponent({ artifacts, children, params, themes }) {
  const theme = params.slug;
  const themeArtifacts = artifacts.data.items.filter((artifact) => {
    return artifact.themes && artifact.themes.includes(theme);
  });
  return (
    <div>
      {themes[theme]}
      <ul className="artifact-grid">
        {themeArtifacts.map((artifact) => {
          return <ArtifactGridItem artifact={artifact} key={artifact.slug} />;
        })}
      </ul>
      {children}
      <div style={{clear: 'both'}}></div>
    </div>
  );
}

ArtifactThemeComponent.propTypes = propTypes;

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
    const width = this.props.artifact.headline.length > 100 ? 'wide': 'narrow';
    return (
      <li className={"artifact-grid-item-" + width} onClick={this.onClick} style={{backgroundImage: "url('" + this.props.artifact.image_url + "')"}}>
        <div className="artifact-grid-item-inner">
          <div className="artifact-grid-item-inner-text">
            {this.props.artifact.headline}
          </div>
        </div>
      </li>
    );
  }
});

export default ArtifactThemeComponent;
