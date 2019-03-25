import OpenSkyAPI from './OpenSkyAPI'

class BusiestAirport extends OpenSkyAPI {

    constructor() {
        super();
    }

    /**
     * Return an array of all flights within a 
     * given interval
    */
    getAllFlights(from, to) {
        /* 1hr = 3600s 1day = 86400s */
        // Math.floor(new Date().getTime()/1000.0) getTime()
        const currentTimeInEpoch = Math.floor(Date.now() / 1000);
        const begin = currentTimeInEpoch - (3600 * 48),
            end = begin + 3600;

        return fetch(this.getAllFlightsURL(begin, end))
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    /**
    * Return an array of all flights within a 
    * given interval
   */
    getArrivalOrDepartureFlights(fromTime, airportIcaoCode, isArrival = true) {
        /* 1hr = 3600s 1day = 86400s */
        // Math.floor(new Date().getTime()/1000.0) getTime()
        const currentTimeInEpoch = Math.floor(Date.now() / 1000);
        const begin = currentTimeInEpoch - (3600 * 48),
            end = begin + (fromTime * 60);

        const url = (isArrival) ? this.getArrivalFlightsURL(airportIcaoCode, begin, end) : this.getDepartureFlightsURL(airportIcaoCode, begin, end);

        console.log(url);

        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    /**
     * Gets the Top X Busiest Airports' Detail Info
    */
    getBusiestAirportDetails(flights, howMany = 10) {
        if (!flights) {
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
        return Promise.all(requestsArr).then(responses => Promise.all(responses.map(r => r.json())));
    }
}

export default BusiestAirport;