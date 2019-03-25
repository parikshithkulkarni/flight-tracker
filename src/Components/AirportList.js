import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Airport from '../Components/Airport'
import BusiestAirport from '../Scripts/BusiestAirport'
import CircularProgress from '@material-ui/core/CircularProgress';

class AirportList extends Component {
    state = {
        flights: null,
        airports: null,
        searchString: '',
        loaderState: false
    }
    constructor() {
        super()
        this.loadingHandler = this.loadingHandler.bind(this)
    }
    componentDidMount() {
        this.getairports()
    }

    loadingHandler(status) {
        this.setState({
            loaderState: status
        })
    }

    getairports = () => {
        const airport = new BusiestAirport();
        airport.getAllFlights()
            .then(flights => {
                airport.getBusiestAirportDetails(flights, 10)
                    .then(airports => { this.setState({ airports }) });
            });
    }

    render() {
        return (
            <div>
                {this.state.airports ? (
                    <div>
                        <div style={{ display: (this.state.loaderState) ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: '#000', opacity: 0.5 }}>
                            <CircularProgress disableShrink />
                        </div>
                        <h1 margin="normal" style={{ padding: 34 }}> 10 Busiest Airports <i className="fa fa-plane"></i> </h1>
                        <Grid container spacing={24} style={{ padding: 24 }}>
                            {
                                this.state.airports.map((currentairport, i) => (
                                    <Grid key={i} item xs={12} sm={4} lg={3} xl={2}>
                                        <Airport loader={this.loadingHandler} airport={currentairport} />
                                    </Grid>
                                ))}
                        </Grid>
                    </div>
                ) : "No airports found"}
            </div>
        )
    }
}
export default AirportList;