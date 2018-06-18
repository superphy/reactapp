import React, { Component } from 'react';
// react-md
import {
  FileInput,
  Checkbox,
  TextField,
  Button,
  Switch,
  Subheader,
  Divider,
  CircularProgress,
  Collapse,
} from 'react-md';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
import { subtypingDescription } from '../middleware/subtyping'
// import { phylotyperDescription } from '../middleware/phylotyper'
// axios
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// router
import { withRouter } from 'react-router';
import { Redirect } from 'react-router'
import Loading from '../components/Loading'
import { RedirectToken } from '../components/RedirectToken'
// redirects
import { RESULTS } from '../Routes'

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
                  <h6>Search By Accession:</h6>
                  <p>
                  </p>
                </div>
              </Collapse>
            </div>
            {/* End: Help Text */}
            <div className="md-cell md-cell--12">
              <FileInput
                id="inputFile"
                secondary
                label="Select File(s)"
                onChange={this._selectFile}
                multiple
              />

            </div>
            <div className="md-cell md-cell--12">
              <h5>ECTyper Subtyping Analysis</h5>
              <Switch
                id="bulk"
                name="bulk"
                label="Side load for db: don't display results"
                checked={bulk}
                onChange={this._updateBulk}
              />
              {bulk?<Subheader primaryText='WARNING: You wont be able to see any results! This is meant for local use only.' inset/>:''}
              {!groupresults && !bulk ?
                <Subheader primaryText="(Will split files & subtyping methods into separate results)" inset />
              : ''}
              <Checkbox
                id="serotype"
                name="check serotype"
                checked={serotype}
                onChange={this._updateSerotype}
                label="Serotype"
              />
              <Checkbox
                id="vf"
                name="check vf"
                checked={vf}
                onChange={this._updateVf}
                label="Virulence Factors"
              />
              <TextField
                id="pi"
                value={pi}
                onChange={this._updatePi}
                helpText="Percent Identity for BLAST"
              />

            </div>
            <div className="md-cell md-cell--12">
              <h5>RGI (CARD) Analysis</h5>
              <Checkbox
                id="amr"
                name="check amr"
                checked={amr}
                onChange={this._updateAmr}
                label="Antimicrobial Resistance"
              />
              {amr ?
                <Subheader primaryText="(Note: AMR increases run-time by several minutes per file)" inset />
              : ''}
              <Divider />
            </div>
            <div className="md-cell md-cell--12">

              <h5>Phylotyper Subtyping Analysis</h5>

              {/* <Subheader primaryText="(Phylotyper requires VF and disables grouping results)" inset/> */}

              <Checkbox
                id="stx1"
                name="check stx1"
                checked={stx1}
                onChange={this._updateStx1}
                label="Shiga-toxin 1 Subtype"
              />

              <Checkbox
                id="stx2"
                name="check stx2"
                checked={stx2}
                onChange={this._updateStx2}
                label="Shiga-toxin 2 Subtype"
              />

              <Checkbox
                id="eae"
                name="check eae"
                checked={eae}
                onChange={this._updateEae}
                label="Intimin Subtype"
              />

              <TextField
                id="prob"
                value={prob}
                onChange={this._updateProb}
                helpText="Probability threshold for subtype assignment in Phylotyper"
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
            <div className="md-cell md-cell--12">
              {this.state.file ? this.state.file.map(f => (
                <TextField
                  key={f.name}
                  defaultValue={f.name}
                  id={f.name}
                />
              )) : ''}
            </div>
          </form> :
          // if results are grouped, display the Loading page
          // else, results are separate and display the JobsList cards page
          (!uploading?(!groupresults?
            <Redirect to={RESULTS} />:
            <Loading jobId={this.state.jobId} />
          ):"")
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    jobs: state.jobs,
    ...ownProps
  }
}

Subtyping = withRouter(connect(
  mapStateToProps
)(Subtyping))

Subtyping = connect()(Subtyping)

export default Search
