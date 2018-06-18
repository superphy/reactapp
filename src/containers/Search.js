import React, { Component } from 'react';
// react-md
import {
  TextField,
  Button,
  Collapse,
} from 'react-md';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// router
import Loading from '../components/Loading'
import { RedirectToken } from '../components/RedirectToken'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      st: '',
      collapsed: true,
      submitted: false,
      open: false,
      jobId: "",
      hasResult: false,
    }
  }
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  _updateSt = (value) => {
    this.setState({ st: value });
  }
  _handleSubmit = (e) => {
    e.preventDefault() // disable default HTML form behavior
    // Create form.
    var data = new FormData()
    data.append('st', this.state.st)
    // POST
    axios.post(API_ROOT + 'search', data)
      .then(response => {
        console.log("RESPONSE")
        console.log(response)
        let jobId = response.data
        this.setState({ jobId })
        // Handle the return.
        this.props.dispatch(addJob(jobId,
          'search',
          new Date().toLocaleString(),
          String('Search for ' + this.state.st + ' at: ' + new Date().toLocaleString())
        ))
        this.setState({ hasResult: true })
      })
  };
  render(){
    const { st, hasResult, collapsed } = this.state;
    const { token } = this.props;
    return (
      <div>
        <RedirectToken token={token} />
        {/* actual form */}
        {(!hasResult)?
          <form className="md-text-container md-grid">
            <div className="md-cell md-cell--12">
              {/* Help Text */}
              <Button raised primary swapTheming label='Help' onClick={this.toggle}>
                help_outline
              </Button>
              <Collapse collapsed={collapsed}>
                <div>
                  <br />
                  <h6>Description:</h6>
                  <p>
                  </p>
                </div>
              </Collapse>
            </div>
            {/* End: Help Text */}
            <div className="md-cell md-cell--12">
              <h5>Search By Accession</h5>
              <TextField
                id="st"
                value={st}
                onChange={this._updateSt}
                helpText="Accession #"
              />
            </div>
            <div className="md-cell md-cell--12">
              <Button
                raised
                secondary
                type="submit"
                label="Submit"
                disabled={!file}
                onClick={this._handleSubmit}
              />
            </div>
          </form> :
          <Loading jobId={this.state.jobId} />
        }
      </div>
    )
  }
}

Search = connect()(Search)

export default Search
