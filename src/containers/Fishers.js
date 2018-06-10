import React, { PureComponent } from 'react';
import {
  Button,
  Card,
  CardTitle,
  CardText,
  Media,
  MediaOverlay,
  CardActions,
} from 'react-md';
import GroupsForm from '../containers/GroupsForm'
import Loading from '../components/Loading'
import ontology from '../images/ontology.png'
import { maxWidth } from '../middleware/layout'
// axios is a http client lib
import axios from 'axios'
import { API_ROOT } from '../middleware/api'
// Snackbar
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// redux
import { connect } from 'react-redux'
import { addJob } from '../actions'
import { fishersDescription } from '../middleware/fishers'
import { RedirectToken } from '../components/RedirectToken'

const maxStep = 4

const nextButton = (step, next, prev) => (
  <div className="buttons__group">
    <h5>Step {step}/{maxStep}</h5>
    {step>1 ?
      <Button flat primary label='Previous' onClick={prev}>navigate_before</Button>
    :''}
    {step<maxStep ?
      <Button flat primary label='Next' onClick={next}>navigate_next</Button>
    :''}
  </div>
)

const fdescrip = (step, nextStep, prevStep) => (
  <Card
    className="cards__example md-cell md-cell--6 md-cell--8-tablet"
    style={{ maxWidth: maxWidth }}
  >
    <Media>
      <img src={ontology} alt="ontology" />
      <MediaOverlay>
        <CardTitle title="Compare Graph Nodes" subtitle="via Fisher's Exact Test">
        </CardTitle>
      </MediaOverlay>
    </Media>
    <CardText>
      <p>
        <h5>About:</h5>
        This is the downstream analysis step of Spfy, after initial data intake
        via the "Subtyping" feature. The main idea is to determine if there are
        statistically significant differences in the relation of a target group
        between two population groups. For example, we can compare all the
        samples in the database with O-type O157 vs all samples of type O26,
        for the presence/absence of all known AMR genes in the database. In
        other words, which AMR genes present in O157 samples are not significantly
        present in O26, and which are.
      </p>
      <p>
        <h5>Steps:</h5>
        The steps for creating a new comparison are as follows:
        <li>1. Select a group of nodes or attributes for Group 1.</li>
        <li>2. Select a group of nodes or attributes for Group 2.</li>
        <li>3. Select a target group of nodes or attributes.</li>
        <li>
          4. Spfy will perform the comparison are return the associated p-values
          and odds ratios.
        </li>
        Help text is available at each step along the way.
      </p>
      <p>
        <h5>Rationale:</h5>
        Because analysis modules in biology tend to have different result
        formats, graph storage allows comparisons between the results of
        different types without explicit joins. As in the above example, our
        O-type analysis was developed internally whereas the RGI tool was
        developed by the CARD initiative <a href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5210516/'>doi: 10.1093/nar/gkw1004</a>.
      </p>
    </CardText>
    <CardActions>
      {nextButton(step, nextStep, prevStep)}
    </CardActions>
  </Card>
)

class Fishers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jobId: "",
      hasResult: false,
      open: false, //for the snackbar
      msg: "",
      step: 1,
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
        // check that all attributes are set (which req all relations to be set)
        if(!relation.attribute > 0){
          console.log('Form failed valid for attribute: ' + relation.attribute)
          this.setState({
            msg: "Please select an attribute for Group " + i + " Relation " + j
          });
          valid = false
        }
        // check that all necessary joining operators are set
        // only check logical operators for joining relations
        if(j < groups[i].length-1){
          if(!relation.logical){
            console.log('Form failed valid for logical: ' + relation.logical)
            this.setState({
              msg: "Please select a logical operator for Group " + i + " Relation " + j
            });
            valid = false
          }
        }
      }
    }
    // check that a target was set
    if(!target > 0){
      valid = false
      this.setState({
        msg: "Please select a target"
      });
    }
    // form validation complete
    console.log(valid)
    if(valid){
      this.setState({
        open: true,
        msg: "Comparison was submitted"
      });
      // submit the form
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
          // add jobid to redux store
          this.props.dispatch(addJob(jobId,
            'fishers',
            new Date().toLocaleString(),
            fishersDescription(groups, target)
          ))
        });
    } else {
      this.setState({
        open: true
      });
    }
  }
  _next = () => {
    this.setState({step: this.state.step+1})
  }
  _prev = () => {
    this.setState({step: this.state.step-1})
  }
  // Snackbar
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    const {
      token
    } = this.props;
    const {
      hasResult,
      jobId,
      step,
    } = this.state;
    return (
      <div>
        <RedirectToken token={token} />
        <div className="md-grid">
          {step===1 ? fdescrip(step, this._next, this._prev):
              (!hasResult ?
                <GroupsForm
                  handleChangeSubmit={this.handleChangeSubmit}
                  nextButton={nextButton(step, this._next, this._prev)}
                  step={step}
                />
              : <Loading jobId={jobId} />)
          }
          <MuiThemeProvider>
            <Snackbar
              open={this.state.open}
              message={this.state.msg}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

Fishers = connect()(Fishers)

export default Fishers
