import React, { Component } from 'react';
import { connect } from 'react-refetch'
// progress bar
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
// requests
import { API_ROOT } from '../middleware/api'
// Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const sidebar = 200;

class ResultSubtyping extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentWillMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  calcWidth = ( dec ) => {
    let workableWidth = this.state.width - sidebar;
    return workableWidth*dec
  }
  render() {
    const { results } = this.props;
    const options = {
      searchPosition: 'left'
    };
    if (results.pending){
      return <div>Waiting for server response...<CircularProgress key="progress" id='contentLoadingProgress' /></div>
    } else if (results.rejected){
      return <div>Couldn't retrieve job: {this.props.jobId}</div>
    } else if (results.fulfilled){
      console.log(results)
      return (
        <BootstrapTable data={results.value} exportCSV search options={options}>
          <TableHeaderColumn isKey dataField='filename' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.20)} csvHeader='Filename'>Filename</TableHeaderColumn>
          <TableHeaderColumn dataField='contigid' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.10)} csvHeader='Contig ID'>Contig ID</TableHeaderColumn>
          <TableHeaderColumn dataField='analysis' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.10)} csvHeader='Analysis'>Analysis</TableHeaderColumn>
          <TableHeaderColumn dataField='hitname' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.10)} csvHeader='Hit'>Hit</TableHeaderColumn>
          <TableHeaderColumn dataField='longname' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.05)} csvHeader='Long Hitname'>Long Hitname</TableHeaderColumn>
          <TableHeaderColumn dataField='hitorientation' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.05)} csvHeader='Orientation'>Orientation</TableHeaderColumn>
          <TableHeaderColumn dataField='hitstart' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.05)} csvHeader='Start'>Start</TableHeaderColumn>
          <TableHeaderColumn dataField='hitstop' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.05)} csvHeader='Stop'>Stop</TableHeaderColumn>
          <TableHeaderColumn dataField='hitcutoff' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.05)} csvHeader='%Identity'>%Identity</TableHeaderColumn>
          <TableHeaderColumn dataField='probability' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width={this.calcWidth(0.05)} csvHeader='Assignment Likelihood'>Assignment Likelihood</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.jobId}`}
}))(ResultSubtyping)
