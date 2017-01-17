import React, { PropTypes } from 'react';

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
    const headline = this.props.artifact.headline;
    const width = (headline && headline.length) > 100 ? 'wide': 'narrow';
    const imageUrl = (this.props.artifact.image_thumbnail_url
        ? this.props.artifact.image_thumbnail_url
        : this.props.artifact.image_url);
    return (
      <li className={"artifact-grid-item-" + width} onClick={this.onClick} style={{backgroundImage: "url('" + imageUrl + "')"}}>
        <div className="artifact-grid-item-inner">
          <div className="artifact-grid-item-inner-text">
            {this.props.artifact.headline}
          </div>
        </div>
      </li>
    );
  }
});

function ArtifactGrid({ artifacts }) {
  return (
    <ul className="artifact-grid">
      {artifacts.map((artifact) => {
        return <ArtifactGridItem artifact={artifact} key={artifact.slug} />;
      })}
    </ul>
  );
}

export {
  ArtifactGrid,
};
