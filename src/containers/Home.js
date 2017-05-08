import React, { PureComponent } from 'react';
import GroupsForm from './GroupsForm'
// axios is a http client lib
import axios from 'axios'
import { API_ROOT } from '../middleware/api'

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
    this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }
  handleResponse(response) {
    const results = response;
    this.setState({results})
  }
  handleChangeSubmit(groups, target){
    axios.post(API_ROOT + 'newgroupcomparison', {
      groups: groups,
      target: target
    })
      .then(response => {
        console.log(response);
        this.handleResponse(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="md-grid">
        <GroupsForm handleChangeSubmit={this.handleChangeSubmit} />
      </div>
    );
  }
}
