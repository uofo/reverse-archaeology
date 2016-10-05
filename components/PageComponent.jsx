import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

//import '../styles/components/page.scss';

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
      <div>
        <h2>{page.title}</h2>
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
