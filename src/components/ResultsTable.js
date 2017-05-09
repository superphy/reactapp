import React, { PureComponent } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

class ResultsTable extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    const rows = this.props.results.data.map((row, i) => (
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
            {this.props.results.columns.map((value, i) => (
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

export default ResultsTable
