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

const headers = [
  "Filename",
  "Contig ID",
  "Analysis",
  "Hit",
  "Orientation",
  "Start",
  "Stop",
  "Cutoff"
]

class ResultSubtyping extends Component {
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
      // const rows = results.value.map((row, i) => (
      //   <TableRow key={i}>
      //     <TableColumn key='filename'>{row.filename}</TableColumn>
      //     <TableColumn key='contigid'>{row.contigid}</TableColumn>
      //     <TableColumn key='analysis'>{row.analysis}</TableColumn>
      //     <TableColumn key='hitname'>{row.hitname}</TableColumn>
      //     <TableColumn key='orientation'>{row.hitorientation}</TableColumn>
      //     <TableColumn key='start'>{row.hitstart}</TableColumn>
      //     <TableColumn key='stop'>{row.hitstop}</TableColumn>
      //     <TableColumn key='cutoff'>{row.hitcutoff}</TableColumn>
      //   </TableRow>
      // ));
      return (
        <BootstrapTable data={results.value} exportCSV search options={options}>
          <TableHeaderColumn isKey dataField='filename' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='400' csvHeader='Filename'>Filename</TableHeaderColumn>
          <TableHeaderColumn dataField='contigid' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='180' csvHeader='Contig ID'>Contig ID</TableHeaderColumn>
          <TableHeaderColumn dataField='analysis' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } csvHeader='Analysis'>Analysis</TableHeaderColumn>
          <TableHeaderColumn dataField='hitname' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } csvHeader='Hit'>Hit</TableHeaderColumn>
          <TableHeaderColumn dataField='hitorientation' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='100' csvHeader='Orientation'>Orientation</TableHeaderColumn>
          <TableHeaderColumn dataField='hitstop' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='Start'>Start</TableHeaderColumn>
          <TableHeaderColumn dataField='hitstop' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='140' csvHeader='Stop'>Stop</TableHeaderColumn>
          <TableHeaderColumn dataField='hitcutoff' dataSort filter={ { type: 'TextFilter', placeholder: 'Please enter a value' } } width='80' csvHeader='Cutoff'>Cutoff</TableHeaderColumn>
        </BootstrapTable>

        // <DataTable plain>
        //   <TableHeader>
        //     <TableRow>
        //       {headers.map((value, i) => (
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
}))(ResultSubtyping)
