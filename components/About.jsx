import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/about.scss';

const propTypes = {
  bios: PropTypes.array,
  children: PropTypes.element,
  pages: PropTypes.object,
  route: PropTypes.object,
};

function PageComponent({ bios, children, pages, route }) {
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
                  <img src={bio.image_url} />
                  <div>{bio.name}</div>
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
