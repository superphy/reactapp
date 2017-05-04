import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GCFormActions from '../actions/groupsform';
import Paper from 'react-md/lib/Papers';
import Button from 'react-md/lib/Buttons/Button';
import Group from '../components/Group';
// Temporary to display fields in class Group
import attributes from '../constants';
// axios is a http client lib
import axios from 'axios'

class GroupsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert('A name was submitted: ');
    console.log(this.children.state)
    event.preventDefault();
  }
  componentDidMount() {
    axios.get(`http://10.139.14.156:8000/api/v0/get_all_attribute_types`)
      .then(res => {
        const groups = res.data;
        this.setState({ groups });
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="paper-container">
          <Paper>
              <Group groups={this.state.groups} attributes={attributes}></Group>
          </Paper>
          <Paper>
              <Group groups={this.state.groups} attributes={attributes}></Group>
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
