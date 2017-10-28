import React, { Component } from 'react';
import { connect } from 'react-refetch'
// progress bar
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
// requests
import { API_ROOT } from '../middleware/api'
// Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class ResultPhylotyper extends Component {
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
        <BootstrapTable data={results.value} exportCSV search options={options}>
          <TableHeaderColumn isKey dataField='genome' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='360' csvHeader='Genome'>Genome</TableHeaderColumn>
          <TableHeaderColumn dataField='subtype' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='100' csvHeader='Subtype'>Subtype</TableHeaderColumn>
          <TableHeaderColumn dataField='subtype_gene' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='100' csvHeader='Subtype Gene'>Subtype Gene</TableHeaderColumn>
          <TableHeaderColumn dataField='contig' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='180' csvHeader='Contig ID'>Contig ID</TableHeaderColumn>
          <TableHeaderColumn dataField='stop' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='Start'>Start</TableHeaderColumn>
          <TableHeaderColumn dataField='start' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='Stop'>Stop</TableHeaderColumn>
          <TableHeaderColumn dataField='probability' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='80' csvHeader='Probability'>Assignment Likelihood</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.jobId}`}
}))(ResultPhylotyper)
