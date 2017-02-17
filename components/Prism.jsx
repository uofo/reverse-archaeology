import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import DynamicContent from './DynamicContent';
import Slideshow from './Slideshow';

import '../styles/components/prism.scss';

const propTypes = {
  children: PropTypes.element,
  pages: PropTypes.object,
  route: PropTypes.object,
  slideshowimages: PropTypes.array,
};

function ProjectItem({ project }) {
  let imgUrl = project.image_url;
  if (imgUrl && !imgUrl.startsWith('http')) {
    imgUrl = config.imageUrlBase + imgUrl;
  }

  return (
    <div className="project-item">
      { imgUrl ? (
        <div className="project-item-image-container">
          <img
            className="project-item-image"
            src={imgUrl}
          />
        </div>
        ) : null }
      <div className="project-item-body">
        <DynamicContent innerHTML={project.content} />
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
);
}

function PageComponent({ blurbs, children, pages, prismprojects, route, slideshowimages }) {
  let body;
  let page;

  if (pages) {
    page = pages.data.items.filter(page => page.title === route.title)[0];
  }

  const prismSlideshowImages = slideshowimages.filter(image => image.page === 'prism');

  let blurb;
  if (blurbs) {
    blurb = blurbs.filter(blurb => blurb.page === 'prism')[0];
  }

  if (page) {
    body = (
      <div className="prism">
        <Slideshow images={prismSlideshowImages} />
        <div className="prism-screen">
          <div className="prism-blurb">
            <h2>The Prism is magic</h2>
            <div>
              <div className="header-separator"></div>
              <DynamicContent innerHTML={blurb.content} />
            </div>
          </div>
        </div>
        <DynamicContent innerHTML={page.content} />
        <div className="prism-projects">
          {prismprojects.map(project => {
            return <ProjectItem project={project} key={project.order} />;
          })}
          <div style={{ clear: 'both' }}></div>
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
