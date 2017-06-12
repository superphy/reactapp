import React, { Component } from 'react';
import { connect } from 'react-refetch'
// progress bar
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
// requests
import { API_ROOT } from '../middleware/api'
// Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class ResultFishers extends Component {
  render() {
    const { results } = this.props
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
        <BootstrapTable data={results.value.data} exportCSV search options={options}>
          <TableHeaderColumn  isKey dataField='0' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='400' csvHeader='Target'>Target</TableHeaderColumn>
          <TableHeaderColumn  dataField='1' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } csvHeader='QueryA'>QueryA</TableHeaderColumn>
          <TableHeaderColumn  dataField='2' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } csvHeader='QueryB'>QueryB</TableHeaderColumn>
          <TableHeaderColumn  dataField='3' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='#Present QueryA'>#Present QueryA</TableHeaderColumn>
          <TableHeaderColumn  dataField='4' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='#Absent QueryA'>#Absent QueryA</TableHeaderColumn>
          <TableHeaderColumn  dataField='5' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='#Present QueryB'>#Present QueryB</TableHeaderColumn>
          <TableHeaderColumn  dataField='6' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='#Absent QueryB'>#Absent QueryB</TableHeaderColumn>
          <TableHeaderColumn  dataField='7' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='P-Value'>P-Value</TableHeaderColumn>
          <TableHeaderColumn  dataField='8' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='Odds Ratio'>Odds Ratio</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.jobId}`}
}))(ResultFishers)
