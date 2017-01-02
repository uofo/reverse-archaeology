import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/prism.scss';

const propTypes = {
  children: PropTypes.element,
  pages: PropTypes.object,
  route: PropTypes.object,
};

function PageComponent({ children, pages, route }) {
  let body;
  let page;

  if (pages) {
    page = pages.data.items.filter(page => page.title === route.title)[0];
  }

  if (page) {
    body = (
      <div className="prism">
        <div className="prism-screen">
          <div className="prism-blurb">
            <h2>The Prism</h2>
            <div>Prism blurb</div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{__html: decode(page.content)}} />
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