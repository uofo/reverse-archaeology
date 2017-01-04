import React, { PropTypes } from 'react';

import Autocomplete from 'react-autocomplete';

import '../styles/components/search.scss';

const autocompleteStyles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
};

var State = React.createClass({
  propTypes: {
    artifacts: PropTypes.array.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      value: ''
    }
  },

  matchArtifactToTerm: function (artifact, value) {
    return  artifact.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  },

  sortArtifacts: function (a, b, value) {
    return (
      a.title.toLowerCase().indexOf(value.toLowerCase()) >
      b.title.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
    )
  },

  render: function () {
    return (
        <div className="search">
          <Autocomplete
            value={this.state.value}
            inputProps={{name: "Artifact search", id: "artifacts-autocomplete"}}
            items={this.props.artifacts}
            getItemValue={(item) => item.title}
            shouldItemRender={this.matchArtifactToTerm}
            sortItems={this.sortArtifacts}
            onChange={(event, value) => this.setState({ value })}
            onSelect={(value, item) => {
              this.setState({ value });
              this.context.router.push('/artifacts/' + item.slug);
            }}
            renderMenu={(items, value, style) => {
              return React.createElement('div', { className: 'artifacts-autocomplete-menu', children: items })
            }}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? autocompleteStyles.highlightedItem : autocompleteStyles.item}
                key={item.id}
              >{item.title}</div>
            )}
          />
          <img className="search-icon" src="/img/search.png" />
        </div>
    );
  }
});

export default State;
