import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Lightbox from 'react-images';

import config from '../config';
import DynamicContent from './DynamicContent';
import Slideshow from './Slideshow';

import '../styles/components/chasm.scss';

class PolicyItem extends React.Component {
  render() {
    let imgUrl = this.props.policy.image_url;
    if (imgUrl && !imgUrl.startsWith('http')) {
      imgUrl = config.imageUrlBase + imgUrl;
    }

    return (
      <div className="policy-item">
        { imgUrl ? (
          <div className="policy-item-image-container">
            <img
              className="policy-item-image"
              src={imgUrl}
              onClick={() => { this.props.imageClick(this.props.policy.figure_number - 1) }}
            />
          </div>
          ) : null }
        <div className="policy-item-body">
          <h2 className="policy-item-header">
            <span className="policy-item-header-text">{this.props.policy.name}</span>
            { this.props.policy.figure_number ? (
              <img 
                className="policy-item-header-figure"
                src={`/img/chasm/fig_${this.props.policy.figure_number}.png`} 
                onClick={() => { this.props.imageClick(this.props.policy.figure_number - 1) }}
              />
            ) : null }
          </h2>
          <DynamicContent innerHTML={this.props.policy.content} />
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    );
  }
}

PolicyItem.propTypes = {
  imageClick: PropTypes.func.isRequired,
  policy: PropTypes.object.isRequired,
};

class Chasm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      figureLightboxCount: 0,
      figureLightboxIndex: 0,
      figureLightboxIsOpen: false,
      figureImageSet: [],
    };
  }

  componentWillMount() {
    this.updateImageSet();
  }

  componentWillReceiveProps(props) {
    this.updateImageSet();
  }

  updateImageSet() {
    this.setState((prevState, props) => {
      const imageSet = this.createImageSet(props.chasmpolicies);
      return {
        figureLightboxCount: imageSet.length,
        figureImageSet: imageSet,
      };
    });
  }

  createImageSet(policies) {
    let imageSet = [];
    policies.forEach(policy => {
      if (!policy.image_url) return;
      let imgUrl = policy.image_url;
      if (imgUrl && !imgUrl.startsWith('http')) {
        imgUrl = config.imageUrlBase + imgUrl;
      }

      imageSet.push({
        src: imgUrl,
        caption: `Figure ${policy.figure_number}: ${policy.image_caption}`,
      });
    });
    return imageSet;
  }

  closeLightbox(index) {
    this.setState({
      figureLightboxIsOpen: false,
    });
  }

  openLightbox(index) {
    this.setState({
      figureLightboxIndex: index,
      figureLightboxIsOpen: true,
    });
  }

  nextLightbox() {
    this.setState(prevState => {
      return {
        figureLightboxIndex: (prevState.figureLightboxIndex + 1) % prevState.figureLightboxCount
      };
    });
  }

  prevLightbox() {
    this.setState(prevState => {
      const nextIndex = prevState.figureLightboxIndex - 1;
      return {
        figureLightboxIndex: nextIndex < 0 ? prevState.figureLightboxCount - 1 : nextIndex
      };
    });
  }

  render() {
    let body;
    let page;

    if (this.props.pages) {
      page = this.props.pages.data.items.filter(page => page.title === this.props.route.title)[0];
    }

    const chasmSlideshowImages = this.props.slideshowimages.filter(image => image.page === 'chasm');

    let blurb;
    if (this.props.blurbs) {
      blurb = this.props.blurbs.filter(blurb => blurb.page === 'chasm')[0];
    }

    if (page) {
      const chasmpolicies = this.props.chasmpolicies.sort((a, b) => {
        return a.order - b.order;
      });

      body = (
        <div className="chasm">
          <Slideshow images={chasmSlideshowImages} />
          <div className="chasm-screen">
            <div className="chasm-blurb">
              <h2>The Chasm is real</h2>
              <div>
                <div className="header-separator"></div>
                <DynamicContent innerHTML={blurb.content} />
              </div>
            </div>
          </div>
          <div className="chasm-body">
            <Lightbox
              backdropClosesModal={true}
              currentImage={this.state.figureLightboxIndex}
              onClose={this.closeLightbox.bind(this)}
              onClickNext={this.nextLightbox.bind(this)}
              onClickPrev={this.prevLightbox.bind(this)}
              isOpen={this.state.figureLightboxIsOpen}
              images={this.state.figureImageSet}
            />

            <div className="chasm-body-page-top"></div>
            <div className="chasm-body-page">
              <div className="chasm-body-key">
                <div className="chasm-body-key-separator"></div>
                <div className="chasm-body-key-image"></div>
                <div className="chasm-body-key-text">
“In that searing moment, I realized the loss he was describing was, in a crucial way, the collective loss. It was the loss of a massive web of connections - a way of being - that had been destroyed by urban renewal; it was as if thousands of people, who seemed to be with me in sunlight, were at some deeper level of their being wandering lost in a dense fog, unable to find one another for the rest of their lives.”
                  <div className='chasm-body-key-text-attribution'>&mdash;Dr. Mindy Thompson Fullilove, Root Shock: How Tearing Up City Neighborhoods Hurt America, and What We Can Do About It</div>
                </div>
                <div style={{ clear: 'both' }}></div>
                <div className="chasm-body-key-separator"></div>
              </div>
              <DynamicContent innerHTML={page.content} />
              <img className="serial-displacement-timeline" src="/img/chasm/serial-displacement-timeline.png" />
              <img className="serial-displacement-crack" src="/img/chasm/serial-displacement-crack.png" />
            </div>
            <div className="chasm-body-page-bottom"></div>

            <div className="chasm-body-page-top"></div>
            <div className="chasm-body-page">
              <div>
                These are some of the series of policies that are part of Serial Forced Displacement:
              </div>

              <div className="chasm-figures">
                {chasmpolicies.map(policy => {
                  return <PolicyItem policy={policy} key={policy.order} imageClick={this.openLightbox.bind(this)} />;
                })}
              </div>

              <div>
                <p>Serial forced displacement is a particularly grave threat to health because it repeatedly attacks the very foundation of human health: the stable neighborhood that has intergenerational knowledge of how to survive in a given place.  Destruction of neighborhoods traumatizes people and destroys wealth of all kinds, including people’s economic, political, social, and cultural capital. Serial forced displacement is unjust and creates inequity.</p>
                <p>
                  <Link to="/prism"><strong>The Chasm is Real. Help Bridge the Chasm.</strong></Link>
                </p>
              </div>
            </div>
            <div className="chasm-body-page-bottom"></div>

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
}

Chasm.propTypes = {
  blurbs: PropTypes.array,
  chasmpolicies: PropTypes.array,
  pages: PropTypes.object,
  route: PropTypes.object,
  slideshowimages: PropTypes.array,
};

export default Chasm;
