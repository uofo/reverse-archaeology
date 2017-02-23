import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import config from '../config';
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
  let page_top;
  let page_bottom;

  if (pages) {
    page_bottom = pages.data.items.filter(page => page.slug === 'prism_bottom')[0];
    page_top = pages.data.items.filter(page => page.slug === 'prism_top')[0];
  }

  const prismSlideshowImages = slideshowimages.filter(image => image.page === 'prism');

  let blurb;
  if (blurbs) {
    blurb = blurbs.filter(blurb => blurb.page === 'prism')[0];
  }

  if (page_top && page_bottom) {
    prismprojects = prismprojects.sort((a, b) => {
      return a.order - b.order;
    });
    const halfIndex = Math.round(prismprojects.length / 2);
    const projectRows = [
      prismprojects.slice(0, halfIndex),
      prismprojects.slice(halfIndex)
    ];

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
        <div className="prism-body">
          <div className="prism-top">
            <h2>The Chasm is Real</h2>
            <DynamicContent innerHTML={page_top.content} />
            <h2>With light. With magic,<br></br>With a<br></br>prism</h2>
            <div className="prism-arrow"></div>
          </div>
          <div className="prism-middle">
            <img src='/img/prism/wheel.png' />
          </div>
          <div className="prism-bottom">
            <DynamicContent innerHTML={page_bottom.content} />
            <div className="prism-arrow"></div>
          </div>
          <div className="prism-projects">
            {projectRows.map((row, i) => {
              return (
                <div className="prism-projects-row" key={i}>
                  {row.map(project => {
                    return <ProjectItem project={project} key={project.order} />;
                  })}
                </div>
              );
            })}
          </div>
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
