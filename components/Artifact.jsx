import React, { PropTypes } from 'react';
import Swipeable from 'react-swipeable';
import { Link } from 'react-router';

import DynamicContent from './DynamicContent';
import { phoneWidth } from '../core/constants';

import '../styles/components/artifact.scss';

class Artifact extends React.Component {
  constructor(props) {
    super(props);
  }

  getNextArtifactUrl(artifacts, index) {
    const nextArtifact = artifacts[(index + 1) % artifacts.length];
    return '/artifacts/' + nextArtifact.slug;
  }

  getPreviousArtifactUrl(artifacts, index) {
    const previousArtifact = artifacts[(index - 1) < 0 ? artifacts.length - 1 : index - 1];
    return '/artifacts/' + previousArtifact.slug;
  }

  render() {
    const windowWidth = document.body.clientWidth;
    const isPhone = windowWidth <= phoneWidth;
    const artifactItems = this.props.artifacts.data.items;
    const artifactIndex = artifactItems.findIndex((a) => a.slug === this.props.params.slug);
    const artifact = artifactItems[artifactIndex];

    let body;

    function swipeLeft() {
      this.context.router.push(this.getNextArtifactUrl(artifactItems, artifactIndex));
    }

    function swipeRight() {
      this.context.router.push(this.getPreviousArtifactUrl(artifactItems, artifactIndex));
    }

    if (artifact) {
      const details = (
        <div className="artifact-left-text">
          <div className="artifact-details">
            <span className="artifact-label">Title:</span>
            {artifact.title}
          </div>
          <div className="artifact-themes">
            <span className="artifact-label">Themes:</span>
            {artifact.themes.map(t => this.props.themes[t]).join(', ')}
          </div>
        </div>
      );
      body = (
        <Swipeable className="artifact-container"
          onSwipedLeft={swipeLeft.bind(this)}
          onSwipedRight={swipeRight.bind(this)}>
          <Link className='previous-artifact' to={this.getPreviousArtifactUrl(artifactItems, artifactIndex)}></Link>
          <Link className='next-artifact' to={this.getNextArtifactUrl(artifactItems, artifactIndex)}></Link>
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
                {(!isPhone ? details : '')}
              </div>
              <div className="artifact-right">
                <div className="artifact-text">
                  <DynamicContent innerHTML={artifact.content} />
                </div>
                {(isPhone ? details : '')}
              </div>
            </div>
          </div>
        </Swipeable>
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
}

Artifact.propTypes = {
  artifacts: PropTypes.object,
  params: PropTypes.object,
  themes: PropTypes.object,
};

Artifact.contextTypes = {
  router: React.PropTypes.object
};

export default Artifact;
