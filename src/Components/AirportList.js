import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful'
import Airport from '../Components/Airport'
import OpenSkyAPI from '../Components/OpenSkyAPI'
import BusiestAirport from '../Components/BusiestAirport'
import FlightsData from '../Components/flightsData'

class AirportList extends Component {
    state = {
        // airports: ['jfk', 'nyc', 'dal', 'dfw'],
        flights: FlightsData.flightsApp,
        airports: null,
        searchString: ''
    }
    constructor() {
        super()
        
    }
    componentDidMount() {
        this.getairports()
    }
    getairports = () => {
        // fetch.getEntries({
        //     content_type: 'airport',
        //     query: this.state.searchString
        // })
        // .then((response) => {
        const airport = new BusiestAirport();
        airport.getBusiestAirportDetails(this.state.flights, 10)
            .then(airports => { this.setState({ airports })});
        //     console.log(this.state.airports)
        // })
        // .catch((error) => {
        //   console.log("Error occurred while fetching Entries")
        //   console.error(error)
        // })
    }
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({ searchString: event.target.value })
        } else {
            this.setState({ searchString: '' })
        }
        this.getairports()
    }
    render() {
        return (
            <div>
                {this.state.airports ? (
                    <div>
                        <TextField style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Search for airports"
                            margin="normal"
                            onChange={this.onSearchInputChange}
                        />
                        <h1 margin="normal" style={{ padding: 34 }}> 10 Busiest Airports <i className="fa fa-plane"></i> </h1>
                        <Grid container spacing={24} style={{ padding: 24 }}>
                            { 
                                this.state.airports.map((currentairport,i) => (
                                <Grid key={i} item xs={12} sm={6} lg={4} xl={3}>
                                    <Airport airport={currentairport} />
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