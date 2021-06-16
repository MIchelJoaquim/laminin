import React, {FC} from 'react';

import { default as TableMUI } from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { useStyles, StyledTableCell, StyledTableRow } from './table.styles';
import TableRow  from '@material-ui/core/TableRow';
import { TableProps } from './table.types';
import { v4 } from 'uuid';



const Table: FC<TableProps> = ({headCells, rows}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <TableMUI className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headCells.map(cell => (
              <StyledTableCell key={v4()}>{cell.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={v4()}>
              {headCells.map(cell => (
                <StyledTableCell  key={v4()}>
                  {row[cell.id] as any}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </TableMUI>
    </TableContainer>
  );
};
export default Table;