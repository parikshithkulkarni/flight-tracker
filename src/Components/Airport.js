import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SimpleTable from '../Components/SimpleTable'
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import BusiestAirport from '../Scripts/BusiestAirport'
import debounce from 'lodash.debounce';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {

    return {
        top: `${50}%`,
        left: '50%',
        transform: `translate(-50%,-50%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class Airport extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    createData = (name, calories, fat, carbs, protein) => {
        return { name, calories, fat, carbs, protein };
    }

    state = {
        open: false,
        arrivalSearchString: 60,
        arrivalFlights: null,
        departureSearchString: 60,
        departureFlights: null
    };

    getArrivalDepartureflights = (isArrival = false, isDeparture = false) => {
        // return;
        const airport = new BusiestAirport();
        console.log('getflightscalled');

        /* FOR ARRIVAL FLIGHTS */
        if (isArrival) {
            airport.getArrivalOrDepartureFlights(this.state.arrivalSearchString, this.props.airport.icao)
                .then(flights => {
                    console.log(flights);
                    console.log('getflights', this.props.airport.icao);
                    // airport.getBusiestAirportDetails(flights, 30)
                    this.setState({ arrivalFlights: flights.slice(0, 10) })
                    this.setState({ open: true });
                    this.props.loader(false);
                });
        }

        if (isDeparture) {
            /* FOR DEPARTURE FLIGHTS */
            airport.getArrivalOrDepartureFlights(this.state.departureSearchString, this.props.airport.icao, false)
                .then(flights => {
                    console.log(flights);
                    console.log('getflights', this.props.airport.icao);
                    // airport.getBusiestAirportDetails(flights, 30)
                    this.setState({ departureFlights: flights.slice(0, 10) })
                    this.setState({ open: true });
                    this.props.loader(false);
                });
        }

    }

    onSearchInputChange = (event) => {

        console.log('debounce')
        if (!event.target.value) return;
        if (event.currentTarget.id === "searchArrivalInput") {
            this.setState({ arrivalSearchString: event.target.value })
            this.getArrivalDepartureflights(true, false);
        } else {
            this.setState({ departureSearchString: event.target.value })
            this.getArrivalDepartureflights(false, true);
        }
        console.log(debounce);
    }

    handleOpen = () => {
        this.getArrivalDepartureflights(true, true);
        this.props.loader(true);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;
        return (
            <div>
                {this.props.airport ? (
                    <Card >
                        <CardMedia style={{ height: 0, paddingTop: '56.25%' }}
                            image={'http://lorempixel.com/400/200/city/'+Math.floor(Math.random(0,1)*10)}
                            title={this.props.airport}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {this.props.airport.name}
                            </Typography>
                            <Typography component="p">
                                {this.props.airport.municipality}, {this.props.airport.region.split('-')[1]}, {this.props.airport.country}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" href={this.props.airport.fields} onClick={this.handleOpen} target="_blank">
                                Airport Details
                        </Button>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <div style={getModalStyle()} className={classes.paper}>
                                    <AppBar >
                                        <Toolbar>
                                            <Typography variant="h6" id="modal-title" color="inherit" variant="title">
                                                ICAO number: {this.props.airport.icao}
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                    <Grid container spacing={24} style={{ padding: 24 }}>
                                        <Grid item xs={12} sm={6} lg={6} xl={6}>
                                            <TextField style={{ padding: 24 }}
                                                id="searchArrivalInput"
                                                placeholder="Arrival in last X mins"
                                                margin="normal"
                                                onChange={this.onSearchInputChange}
                                            />
                                            {console.log(this.state.data)}
                                            <SimpleTable
                                                data={this.state.arrivalFlights}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} lg={6} xl={6}>
                                            <TextField style={{ padding: 24 }}
                                                id="searchDepartureInput"
                                                placeholder="Departure in last X mins"
                                                margin="normal"
                                                onChange={this.onSearchInputChange}
                                            />
                                            <SimpleTable data={this.state.departureFlights} />
                                        </Grid>
                                    </Grid>
                                    <AirportlWrapped />
                                </div>
                            </Modal>
                        </CardActions>
                    </Card>
                ) : null}
            </div>
        )
    }
}

Airport.propTypes = {
    classes: PropTypes.object.isRequired,
};

const AirportlWrapped = withStyles(styles)(Airport);

export default AirportlWrapped