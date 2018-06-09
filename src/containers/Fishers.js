import React, { PureComponent } from 'react';
import {
  Loading,
  Button,
  Card,
  CardTitle,
  CardText,
  Media,
  MediaOverlay,
  CardActions,
} from 'react-md';
import GroupsForm from '../containers/GroupsForm'
import ontology from '../images/ontology.png'
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
      <Button flat primary label='Previous' onClick={prev}>input</Button>
    :''}
    {step<=maxStep ?
      <Button flat primary label='Next' onClick={next}>input</Button>
    :''}
  </div>
)

const fdescrip = (step, nextStep, prevStep) => (
  <Card className="cards__example md-cell md-cell--6 md-cell--8-tablet">
    <Media>
      <img src={ontology} alt="Nature from lorempixel" />
      <MediaOverlay>
        <CardTitle title="Such nature" subtitle="Wow!">
          <Button className="md-cell--right" icon>star_outline</Button>
        </CardTitle>
      </MediaOverlay>
    </Media>
    <CardText>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut eleifend odio.
        Vivamus quis quam eget augue facilisis laoreet. Aliquam egestas turpis pellentesque
        cursus porta. Vivamus nisl odio, maximus vel lacinia non, suscipit quis nibh. Sed et
        lacus tempor, interdum nisl ornare, feugiat arcu. Suspendisse aliquam malesuada dui,
        in dignissim velit maximus vitae. Cras ac mattis libero. Proin feugiat justo nec nisi
        sodales, et gravida augue faucibus. Maecenas quis porttitor nunc. Suspendisse congue
        ipsum arcu, id aliquam ante dignissim non. Donec maximus, sapien in faucibus molestie,
        eros nisi ornare neque, et vulputate augue velit vel ante. Phasellus rhoncus, elit
        cursus accumsan viverra, mi lectus dictum elit, non vehicula diam nunc non lectus.
        Sed elementum, risus eget fermentum accumsan, nunc ante commodo diam, eget pulvinar
        risus velit eu sapien. Nunc vitae pellentesque nisl.
      </p>
      <p>
        Maecenas lacinia enim ut risus pellentesque euismod. Vestibulum gravida, risus non
        condimentum volutpat, orci elit laoreet elit, in auctor eros orci non quam. Proin ut
        tellus et est dignissim efficitur. Aliquam erat volutpat. Proin pellentesque metus
        sit amet libero auctor aliquet. Donec scelerisque erat in magna sagittis hendrerit.
        Sed pulvinar enim mattis mauris sodales semper. Mauris eu urna at arcu dapibus
        pretium et in ligula. Sed vel vestibulum nunc.
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
              (!hasResult ? <GroupsForm handleChangeSubmit={this.handleChangeSubmit} />
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
