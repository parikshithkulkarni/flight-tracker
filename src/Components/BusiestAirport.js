import OpenSkyAPI from '../Components/OpenSkyAPI'

class BusiestAirport extends OpenSkyAPI {

    constructor() {
        super();
    }

    /**
     * Gets the Top X Busiest Airports' Detail Info
    */
    getBusiestAirportDetails(flights, howMany = 10) {
        if(!flights) {
            throw "FLights Undefined";
        }
        const icaoCodesArr = this.getBusiestAirportIcaoCodes(flights, howMany);

        return this.fetchAirportDetailsFromIcaoCodes(icaoCodesArr);
    }


    /**
     * Gets the Top X Busiest Airports' Icao Codes
    */
    getBusiestAirportIcaoCodes(flights, howMany = 10) {
        const flightsAtAirport = this.getAllFlightsAtAirport(flights);
        return Object.keys(flightsAtAirport)
            .sort((a, b) => {
                return flightsAtAirport[b] - flightsAtAirport[a];
            })
            .slice(0, howMany);
    }

    /**
     * Returns the total of Inbound/Outbound flights at 
     * all the airports based on flights info
    */
    getAllFlightsAtAirport(flights) {
        const flightsAtAirport = {};
        console.log(flights);
        flights.forEach((d) => {
            const depAirport = d.estDepartureAirport,
                arrAirport = d.estArrivalAirport;

            if (depAirport) {
                flightsAtAirport[depAirport] = (flightsAtAirport[depAirport] || 0) + 1;
            }

            if (arrAirport) {
                flightsAtAirport[arrAirport] = (flightsAtAirport[arrAirport] || 0) + 1;
            }
        })

        return flightsAtAirport;
    }

    /**
     * Return an Array of Objects containing Airport Info 
     * from the icao codes
    */
    fetchAirportDetailsFromIcaoCodes(icaoCodesArr) {
        const requestsArr = icaoCodesArr.map(
            icao => {
                console.log(this.getAirportURL(icao))
                return fetch(this.getAirportURL(icao))
            }
        );
        return Promise.all(requestsArr)
            .then(responses => Promise.all(responses.map(r => r.json())));
    }


    /**
    */
    static airportInfoDetailHtmlFormatter(airport) {
        const airportState = airport.region.split('-')[1];
        const html = `${airport.name}`
            + `(${airport.municipality}, ${airportState}, ${airport.country})`
            + `<br>`;
        return html;
    }

}

export default BusiestAirport;