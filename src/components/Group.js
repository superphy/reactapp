// This implements a single Group selection
// Multiple restrictions on the search query should be contained in separate GroupField objects
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import AddAttribute from './AddAttribute';

export default class Group extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selections: [
        {
          groupid: this.props.groupid,
          key: 0
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  componentDidMount() {
    console.log(this.state)
  }
  render() {
    return (
      <div>
      {this.state.selections.map(selection =>
        <AddAttribute groupid={selection.groupid} key={selection.key} relations={this.props.relations} attributes={this.props.attributes}/>
      )}
    </div>
    );
  }
}
