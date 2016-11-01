import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/about.scss';

const propTypes = {
  bios: PropTypes.array,
  children: PropTypes.element,
  funders: PropTypes.array,
  pages: PropTypes.object,
  partners: PropTypes.array,
  route: PropTypes.object,
};

function PageComponent({ bios, children, funders, pages, partners, route }) {
  let body;
  let page;

  if (pages) {
    page = pages.data.items.filter(page => page.title === route.title)[0];
  }

  if (page) {
    body = (
      <div>
        <h2>About</h2>
        <div dangerouslySetInnerHTML={{__html: decode(page.content)}} />
        <section>
          <h3>Bios</h3>
          <ul className="bio-list">
            {bios.map((bio) => {
              return (
                <li key={bio.name} className="bio-item">
                  <Link to={"about/bios/" + bio.slug}>
                    <img src={bio.image_url} />
                    <div>{bio.name}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h3>Partners</h3>
          <ul className="partner-list">
            {partners.map((partner) => {
              return (
                <li key={partner.name} className="partner-item">
                  <img src={partner.image_url} />
                  <div>{partner.name}</div>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h3>Funders</h3>
          <ul className="funder-list">
            {funders.map((funder) => {
              return (
                <li key={funder.name} className="funder-item">
                  <img src={funder.image_url} />
                  <div>{funder.name}</div>
                </li>
              );
            })}
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
