import React, { PureComponent } from 'react';
import GroupsForm from '../containers/GroupsForm'
import ResultsTable from '../components/ResultsTable'
// axios is a http client lib
import axios from 'axios'
import { API_ROOT } from '../middleware/api'

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jobId: "",
      hasResult: false
    }
    this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
  }
  handleChangeSubmit(groups, target){
    axios.post(API_ROOT + 'newgroupcomparison', {
      groups: groups,
      target: target
    })
      .then(response => {
        console.log(response);
        const jobId = response.data;
        const hasResult = true;
        this.setState({jobId})
        this.setState({hasResult})
      });
  }
  render() {
    return (
      <div className="md-grid">
        {!this.state.hasResult ? <GroupsForm handleChangeSubmit={this.handleChangeSubmit} /> :
        this.state.hasResult && <ResultsTable jobId={this.state.jobId} />}
      </div>
    );
  }
}
