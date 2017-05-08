// This implements a single Group selection
// Multiple restrictions on the search query should be contained in separate GroupField objects
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import AddAttribute from './AddAttribute';
import Button from 'react-md/lib/Buttons/Button';
import Subheader from 'react-md/lib/Subheaders';

let i = 0;

class Group extends PureComponent {
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
        <Button flat label="Add another relation to this group" secondary onClick={this.onClick}>add</Button>
      {this.state.selections.map((selection, index) =>
        <div className="md-grid" key={index}>
          <AddAttribute groupIndex={selection.groupid} key={selection.key} relations={this.props.relations} attributes={this.props.attributes} handleChange={this.props.handleChange} attributeIndex={index}/>
        </div>
      )}
    </div>
    );
  }
}

Group.propTypes = {
  handleChange: PropTypes.func
}

export default Group;
