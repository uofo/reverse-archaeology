import React, { PropTypes } from 'react';

import Autocomplete from 'react-autocomplete';

import { ArtifactGrid } from './ArtifactGrid';

import '../styles/components/search.scss';

const autocompleteStyles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'rgba(118, 16, 105, 0.5)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
};

function artifactMatches(artifact, query) {
  query = query.toLowerCase();
  return (
    (artifact.title && artifact.title.toLowerCase().indexOf(query) !== -1) ||
    (artifact.headline && artifact.headline.toLowerCase().indexOf(query) !== -1) ||
    (artifact.content && artifact.content.toLowerCase().indexOf(query) !== -1)
  );
}

var SearchBar = React.createClass({
  propTypes: {
    artifacts: PropTypes.array.isRequired,
    autocomplete: PropTypes.bool,
    closeMenu: PropTypes.func,
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      value: ''
    }
  },

  sortArtifacts: function (a, b, value) {
    return (
      a.title.toLowerCase().indexOf(value.toLowerCase()) >
      b.title.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
    )
  },

  render: function () {
    let autocompleteProps = {
      value: this.state.value,
      inputProps: {
        name: "Artifact search",
        id: "artifacts-autocomplete",
        onKeyDown: (event) => {
          if (event.key === 'Enter') {
            this.context.router.push('/search/' + this.state.value);
            if (this.props.closeMenu) {
              this.props.closeMenu();
            }
          }
        }
      },
      open: true,
      items: this.props.artifacts,
      getItemValue: (item) => item.title,
      shouldItemRender: artifactMatches,
      sortItems: this.sortArtifacts,
      onChange: (event, value) => this.setState({ value }),
      onSelect: (value, item) => {
        this.setState({ value });
        this.context.router.push('/artifacts/' + item.slug);
      },
      renderMenu: (items, value, style) => {
        return React.createElement('div', { className: 'artifacts-autocomplete-menu', children: items })
      },
      renderItem: (item, isHighlighted) => (
        <div
          style={isHighlighted ? autocompleteStyles.highlightedItem : autocompleteStyles.item}
          key={item.id}
        >{item.title}</div>
      ),
    };

    const windowWidth = document.body.clientWidth;
    if (windowWidth <= 400 || this.props.autocomplete === false) {
      autocompleteProps.open = false;
    }

    return (
        <div className="search">
          <Autocomplete {...autocompleteProps} />
          <img className="search-icon" src="/img/search.png" />
        </div>
    );
  }
});

class SearchResultsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  findResults(query) {
    return this.props.artifacts.data.items.filter((artifact) => {
      return artifactMatches(artifact, query);
    });
  }

  render() {
    const results = this.findResults(this.props.params.query);
    return (
      <div className="search-results artifact-grid-container">
        <h2>Search results</h2>
        <div>
          Results for {this.props.params.query}
        </div>
        <ArtifactGrid artifacts={results} />
      </div>
    );
  }
}

SearchResultsPage.propTypes = {
  artifacts: PropTypes.object,
  params: PropTypes.object.isRequired,
};

export {
  SearchBar,
  SearchResultsPage,
};
