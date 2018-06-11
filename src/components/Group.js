// This implements a single Group selection
// Multiple restrictions on the search query should be contained in separate GroupField objects
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import AddAttribute from './AddAttribute';
import Button from 'react-md/lib/Buttons/Button';
import Subheader from 'react-md/lib/Subheaders';

class Group extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(){
    // callback
    this.props.handleChangeAddRelation(this.props.groupIndex)
  }
  render() {
    return (
      <div>
        <Subheader primary primaryText={"Group: " + this.props.groupIndex} />
        <Button flat label="Add another value to this group" secondary onClick={this.onClick}>add</Button>
      {this.props.group.map((selection, index) =>
        <div className="md-grid" key={index}>
          <AddAttribute
            groupIndex={this.props.groupIndex}
            key={selection.key}
            relations={this.props.relations}
            o_relations={this.props.o_relations}
            handleChange={this.props.handleChange}
            attributeIndex={index}
            numberAttributes={this.props.numberAttributes}
            setQuerying={this.props.setQuerying}
          />
        </div>
      )}
    </div>
    );
  }
}

Group.propTypes = {
  handleChange: PropTypes.func,
  numberAttributes: PropTypes.number
}

export default Group;
