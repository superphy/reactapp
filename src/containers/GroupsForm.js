import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GCFormActions from '../actions/group';
import Paper from 'react-md/lib/Papers';
import Button from 'react-md/lib/Buttons/Button';
import Group from '../components/Group';
// Temporary to display fields in class Group
import { attributes } from '../constants';
// axios is a http client lib
import axios from 'axios'
import { API_ROOT } from '../middleware/api';

class GroupsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      relations: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert('A name was submitted: ');
    console.log(this.children.state)
    event.preventDefault();
  }
  componentDidMount() {
    axios.get(API_ROOT + `get_all_attribute_types`)
      .then(res => {
        const relations = res.data;
        this.setState({ relations });
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="paper-container">
          <Paper>
              <Group groupid='group1' relations={this.state.relations} attributes={attributes}></Group>
          </Paper>
          <Paper>
              <Group groupid='group2' relations={this.state.relations} attributes={attributes}></Group>
          </Paper>
          <Button raised label="Submit" onClick={this.handleSubmit}/>
        </div>
      </form>
    );
  }
}

/// Setting up redux
function mapStateToProps(state) {
  return {
    gcform: state.gcform
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GCFormActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsForm);
