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
      open: false, //for the snackbar
      msg: ""
    }
    this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
  }
  handleChangeSubmit(groups, target){
    // form validations
    let valid = true
    // check groups
    for(let i in groups){
      for(let j in groups[i]){
        let relation = groups[i][j]
        console.log(relation)
        // check that all attributes are set (which req all relations to be set)
        if(!relation.attribute > 0){
          console.log('Form failed valid for attribute: ' + relation.attribute)
          valid = false
        }
        // check that all necessary joining operators are set
        console.log("length of groups " + groups[i].length)
        // only check logical operators for joining relations
        if(j < groups[i].length-1){
          if(!relation.logical){
            console.log('Form failed valid for logical: ' + relation.logical)
            valid = false
          }
        }
      }
    }
    console.log(valid)
    if(valid){
      this.setState({
        open: true,
        msg: "Comparison was submitted"
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
    } else {
      this.setState({
        open: true,
        msg: "Form is invalid"
      });
    }
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
            message={this.state.msg}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
