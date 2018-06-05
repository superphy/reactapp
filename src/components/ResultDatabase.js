import React, { Component } from 'react';
import { connect } from 'react-refetch'
// progress bar
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
// requests
import { API_ROOT } from '../middleware/api'
// Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class ResultDatabase extends Component {
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
        <div>
          <p># of Genome Files: {results.value.length}</p>
          <BootstrapTable data={results.value} exportCSV search options={options}>
            <TableHeaderColumn dataField='NumberGenomes' isKey dataSort filter={ { type: 'NumberFilter', placeholder: 'Please enter a value' } } width='180' csvHeader='Spfy ID'># of Genomes</TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.jobId}`}
}))(ResultDatabase)
