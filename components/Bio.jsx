import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/components/bio.scss';

const propTypes = {
  bios: PropTypes.array,
  children: PropTypes.element,
  params: PropTypes.object,
};

function Bio({ bios, children, params }) {
  const index = bios.findIndex((bio) => bio.slug === params.slug);
  const bio = bios[index];

  let body;

  if (bio) {
    body = (
      <div>
        <h2>{bio.name}</h2>
        {bio.image_url ? <img className='bio-image' src={bio.image_url} /> : ''}
        <div dangerouslySetInnerHTML={{__html: decode(bio.content)}} />
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

Bio.propTypes = propTypes;

export default Bio;
