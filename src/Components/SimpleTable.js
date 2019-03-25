import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        // minWidth: '700',
    },
};

function SimpleTable(props) {
    const { classes } = props;

    let cells;
    if (props.data) {
        cells = props.data.map((n, i) => (
            <TableBody key={'tablebody' + i}>
                <TableRow key={'tablerow' + i}>
                    <TableCell key='flightcode' align="right">{n.icao24}</TableCell>
                    <TableCell component="th" scope="row" key='arrivalairport'>
                        {n.estArrivalAirport}
                    </TableCell>
                    <TableCell key='depairport' align="right">{n.estDepartureAirport}</TableCell>
                </TableRow>
            </TableBody>
        ))

    }

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell key='flightcode' align="right">Flight Code</TableCell>
                        <TableCell key='arrival'>Arrival Airport</TableCell>
                        <TableCell key='departure' align="right">Departure Airport</TableCell>
                    </TableRow>
                </TableHead>
                {console.log(props.data)}
                {cells}
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);