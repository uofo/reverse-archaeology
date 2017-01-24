import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import DynamicContent from './DynamicContent';
import Slideshow from './Slideshow';

import '../styles/components/chasm.scss';

const propTypes = {
  children: PropTypes.element,
  pages: PropTypes.object,
  route: PropTypes.object,
  slideshowimages: PropTypes.array,
};

function PageComponent({ blurbs, children, pages, route, slideshowimages }) {
  let body;
  let page;

  if (pages) {
    page = pages.data.items.filter(page => page.title === route.title)[0];
  }

  const chasmSlideshowImages = slideshowimages.filter(image => image.page === 'chasm');

  let blurb;
  if (blurbs) {
    blurb = blurbs.filter(blurb => blurb.page === 'chasm')[0];
  }

  if (page) {
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
          <DynamicContent innerHTML={page.content} />
          <img className="serial-displacement-timeline" src="/img/chasm/serial-displacement-timeline.png" />
          <img className="serial-displacement-crack" src="/img/chasm/serial-displacement-crack.png" />
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

PageComponent.propTypes = propTypes;

export default PageComponent;
