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
      collapsed: false,
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
              <Button hidden raised primary swapTheming label='Help' onClick={this.toggle}>
                help_outline
              </Button>
              <Collapse collapsed={collapsed}>
                <div>
                  <br />
                  <h6>Description:</h6>
                  <p>
                    We use the <a href='https://biopython.org/wiki/SeqIO'>SeqIO </a>
                    library to parse the identifiers from an isolate.
                    Specifically, we use the record.id which uses the combined
                    gi gb accession numbers.
                  </p>
                  <p>
                    For example, a genbank record:
                    <br/>
                    <br/>
                    Escherichia coli strain 97-3250 chromosome, complete genome
                    <br/>
                    5,942,969 bp circular DNA
                    <br/>
                    CP027599.1 GI:1370526529
                    <br/>
                    <br/>
                    With fasta header:
                    <br/>
                    <br/>
                    >gi|1370526529|gb|CP027599.1| Escherichia coli strain 97-3250 chromosome, complete genome
                    <br/>
                    <br/>
                    Would have a record.id of <b>gi|1370526529|gb|CP027599.1|</b>
                  </p>
                </div>
              </Collapse>
            </div>
            {/* End: Help Text */}
            <div className="md-cell md-cell--12">
              <h5>Search By record.id</h5>
              <TextField
                id="st"
                value={st}
                onChange={this._updateSt}
                helpText="gi|1370526529|gb|CP027599.1|"
              />
            </div>
            <div className="md-cell md-cell--12">
              <Button
                raised
                secondary
                type="submit"
                label="Submit"
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
