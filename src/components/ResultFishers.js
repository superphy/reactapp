import React, { Component } from 'react';
import { connect } from 'react-refetch'
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
// progress bar
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
// requests
import { API_ROOT } from '../middleware/api'

class ResultFishers extends Component {
  render() {
    const { results } = this.props
    if (results.pending){
      return <div>Waiting for server response...<CircularProgress key="progress" id='contentLoadingProgress' /></div>
    } else if (results.rejected){
      return <div>Couldn't retrieve job: {this.props.jobId}</div>
    } else if (results.fulfilled){
      console.log(results)
      const rows = results.value.data.map((row, i) => (
        <TableRow key={i}>
          {row.map((value, ci) => (
            <TableColumn key={ci}>{value}</TableColumn>
          ))}
        </TableRow>
      ));
      return (
        <DataTable plain>
          <TableHeader>
            <TableRow>
              {results.value.columns.map((value, i) => (
                <TableColumn key={i}>{value}</TableColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows}
          </TableBody>
        </DataTable>
      );
    }
  }
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.jobId}`}
}))(ResultFishers)
