// This implements a single Group selection
// Multiple restrictions on the search query should be contained in separate GroupField objects
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import AddAttribute from './AddAttribute';
import Button from 'react-md/lib/Buttons/Button';
import Subheader from 'react-md/lib/Subheaders';

let i = 0;

export default class Group extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // selections represent a list of selected relation-attribute pairs specific to a single group
      selections: [
        {
          groupid: this.props.groupid,
          key: i
        }
      ]
    };

    this.onClick = this.onClick.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  componentDidMount() {
    console.log(this.state)
  }
  onClick(){
    this.setState({
        selections: this.state.selections.concat([{
          groupid: this.props.groupid,
          key: i+1
        }])
      })
    i += 1;
  }
  render() {
    return (
      <div>
        <Subheader primary primaryText={this.props.groupid} />
      {this.state.selections.map(selection =>
        <div className="md-grid" key={this.props.groupid + selection.key}>
          <AddAttribute groupid={selection.groupid} key={selection.key} relations={this.props.relations} attributes={this.props.attributes}/>
          <Button flat label="AND" secondary onClick={this.onClick}>add</Button>
          <Button flat label="OR" secondary onClick={this.onClick}>swap_horiz</Button>
          <Button flat label="NOT" secondary onClick={this.onClick}>block</Button>
          <Button flat label="Remove" secondary onClick={this.onClick}>clear</Button>
        </div>
      )}
    </div>
    );
  }
}
