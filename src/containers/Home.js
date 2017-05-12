import React, { PureComponent } from 'react';
import GroupsForm from '../containers/GroupsForm'
import ResultsTable from '../components/ResultsTable'
// axios is a http client lib
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// Snackbar
import Snackbar from 'material-ui/Snackbar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Snackbar
injectTapEventPlugin();

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jobId: "",
      hasResult: false,
      open: false //for the snackbar
    }
    this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
  }
  handleChangeSubmit(groups, target){
    this.setState({
      open: true,
    });
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
  // Snackbar
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    return (
      <div className="md-grid">
        {!this.state.hasResult ? <GroupsForm handleChangeSubmit={this.handleChangeSubmit} /> : <ResultsTable jobId={this.state.jobId} />}
        <MuiThemeProvider>
          <Snackbar
            open={this.state.open}
            message="Comparison was submitted"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
