import { decode } from 'ent';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import config from '../config';

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
    let imgUrl = bio.image_url;
    if (imgUrl && !imgUrl.startsWith('http')) {
      imgUrl = config.imageUrlBase + imgUrl;
    }

    body = (
      <div className="bio-individual">
        <div className="bio-left">
          <div className="bio-image" style={{ backgroundImage: `url("${imgUrl}")` }}></div>
          <h2 className="bio-name">{bio.name}</h2>
        </div>
        <div className="bio-right">
          <div dangerouslySetInnerHTML={{__html: decode(bio.content)}} />
        </div>
        <div style={{ clear: 'both' }}></div>
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
