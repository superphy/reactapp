// This implements a single Group selection
// Multiple restrictions on the search query should be contained in separate GroupField objects
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import AddAttribute from './AddAttribute';

export default class Group extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
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
    <AddAttribute groups={this.props.groups} attributes={this.props.attributes}/>
    );
  }
}
