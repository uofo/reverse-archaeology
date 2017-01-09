import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import config from '../config';
import Slideshow from './Slideshow';

import '../styles/components/about.scss';

const propTypes = {
  bios: PropTypes.array,
  children: PropTypes.element,
  funders: PropTypes.array,
  pages: PropTypes.object,
  route: PropTypes.object,
  slideshowimages: PropTypes.array,
};

function PageComponent({ bios, children, funders, pages, route, slideshowimages }) {
  let body;
  let page;

  if (pages) {
    page = pages.data.items.filter(page => page.title === route.title)[0];
  }

  const aboutSlideshowImages = slideshowimages.filter(image => image.page === 'about');

  if (page) {
    body = (
      <div className="about">
        <Slideshow images={aboutSlideshowImages} />
        <div className="about-screen">
          <div className="about-blurb">
            <h2>About Us</h2>
            <div dangerouslySetInnerHTML={{__html: decode(page.content)}} />
          </div>
        </div>
        <section className="about-team">
          <h3>
            Our Team
            <div className="header-separator"></div>
          </h3>
          <ul className="bio-list">
            {bios.map((bio) => {
              let imgUrl = bio.image_url;
              if (imgUrl && !imgUrl.startsWith('http')) {
                imgUrl = config.imageUrlBase + imgUrl;
              }
              return (
                <li key={bio.name} className="bio-item">
                  <Link to={"about/bios/" + bio.slug}>
                    <img src={imgUrl} />
                    <div>{bio.name}</div>
                  </Link>
                </li>
              );
            })}
            <li style={{clear: 'both'}}></li>
          </ul>
        </section>
        <section className="about-funders">
          <h3>
            Funders
            <div className="header-separator"></div>
          </h3>
          <ul className="funder-list">
            {funders.map((funder) => {
              let imgUrl = funder.image_url;
              if (imgUrl && !imgUrl.startsWith('http')) {
                imgUrl = config.imageUrlBase + imgUrl;
              }
              return (
                <li key={funder.name} className="funder-item">
                  <a href={funder.website_url} target="_blank">
                    <img alt={funder.name} src={imgUrl} />
                  </a>
                </li>
              );
            })}
            <li style={{clear: 'both'}}></li>
          </ul>
        </section>
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
