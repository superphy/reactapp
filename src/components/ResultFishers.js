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
      // const rows = results.value.data.map((row, i) => (
      //   <TableRow key={i}>
      //     {row.map((value, ci) => (
      //       <TableColumn key={ci}>{value}</TableColumn>
      //     ))}
      //   </TableRow>
      // ));
      return (
        <BootstrapTable data={results.value.data} exportCSV search options={options}>
          <TableHeaderColumn  isKey dataField='0' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='400'>Target</TableHeaderColumn>
          <TableHeaderColumn  dataField='1' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>QueryA</TableHeaderColumn>
          <TableHeaderColumn  dataField='2' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } }>QueryBt</TableHeaderColumn>
          <TableHeaderColumn  dataField='3' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140'>#Present QueryA</TableHeaderColumn>
          <TableHeaderColumn  dataField='4' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140'>#Absent QueryA</TableHeaderColumn>
          <TableHeaderColumn  dataField='5' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140'>#Present QueryB</TableHeaderColumn>
          <TableHeaderColumn  dataField='6' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140'>#Absent QueryB</TableHeaderColumn>
          <TableHeaderColumn  dataField='7' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140'>P-Value</TableHeaderColumn>
          <TableHeaderColumn  dataField='8' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140'>Odds Ratio</TableHeaderColumn>
        </BootstrapTable>
        // <DataTable plain>
        //   <TableHeader>
        //     <TableRow>
        //       {results.value.columns.map((value, i) => (
        //         <TableColumn key={i}>{value}</TableColumn>
        //       ))}
        //     </TableRow>
        //   </TableHeader>
        //   <TableBody>
        //     {rows}
        //   </TableBody>
        // </DataTable>
      );
    }
  }
}

export default connect(props => ({
  results: {url: API_ROOT + `results/${props.jobId}`}
}))(ResultFishers)
