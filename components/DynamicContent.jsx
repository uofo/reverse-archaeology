import { decode } from 'ent';

import React, { PropTypes } from 'react';

import '../styles/components/dynamic-content.scss';

/*
 * Try to intercept internal links from dynamic content (HTML loaded remotely
 * and injected into the page.
 */
export default class DynamicContent extends React.Component {
  componentDidMount() {
    const links = this.refs.contentDiv.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
      const link = links[i];
      const href = link.getAttribute('href').toLowerCase();

      if (!href.startsWith('http')) {
        // If link is internal, add an event listener that pushes onto the 
        // router rather than the default
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.context.router.push(href);
        });
      }
      else {
        // Else, link is external. Make it open in a new tab.
        link.setAttribute('target', '_blank');
      }

      if (href.startsWith('/artifacts/theme/')) {
        const themeSlug = href.split('/').slice(-1)[0];
        const linkClass = 'dynamic-content-theme-link';
        const themeClass = `theme-${themeSlug}`;
        if (link.classList) {
          link.classList.add(linkClass);
          link.classList.add(themeClass);
        }
        else {
          link.className += ` ${linkClass} ${themeClass}`;
        }
      }
    }
  }

  render() {
    return (
      <div ref="contentDiv"
        dangerouslySetInnerHTML={{__html: decode(this.props.innerHTML)}}></div>
    );
  }
}

DynamicContent.propTypes = {
  innerHTML: PropTypes.string.isRequired,
};

DynamicContent.contextTypes = {
  router: React.PropTypes.object,
};
