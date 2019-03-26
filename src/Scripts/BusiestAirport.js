import OpenSkyAPI from './OpenSkyAPI'

class BusiestAirport extends OpenSkyAPI {

    flights = [];
    allAirports = new Map();
    busiestAirports = [];

    constructor() {
        super();
    }

    /**
     * Returns all the airports according to icao Codes
     * and saves it in the allAirports Map.
     */
    getAllAirports() {
        const airportsIcaoDataMap = sessionStorage.getItem('airportsIcaoDataMap');
        if(airportsIcaoDataMap) {
            return new Promise((resolve, reject) => {
                this.setAirportsMap(JSON.parse(airportsIcaoDataMap));
                console.log('fromSession', this.allAirports);
                resolve(this.allAirports);
            });
        }

        return fetch(this.getAllAirportsURL())
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('airportsIcaoDataMap', JSON.stringify(data));
                this.setAirportsMap(data);
                console.log('fromAviationEdgeApi', this.allAirports);
                return this.allAirports;
            })
            .catch(err => console.erorr(err))
    }

    setAirportsMap(data) {
        data.forEach(d => {
            if(d.codeIcaoAirport) {
                this.allAirports.set(d.codeIcaoAirport, d);
            }
        });
    }

    /**
     * Return an array of all flights within a
     * given interval
     */
    getAllFlights(from, to) {
        /* 1hr = 3600s 1day = 86400s */
        // Math.floor(new Date().getTime()/1000.0) getTime()
        const currentTimeInEpoch = Math.floor(Date.now()/1000);
        const begin = currentTimeInEpoch - (3600*24),
            end = begin + 3600;

        return fetch(this.getAllFlightsURL(begin,end))
            .then(response => response.json())
            .then(resp => {
                this.flights = resp;
                return resp;
            })
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
    getBusiestAirportDetails(howMany = 10) {
        const allSortedAirportsCode = this.getBusiestAirportIcaoCodes();
        const busiestAirport = [];

        let counter=0;
        while(counter < howMany) {
            const airportCode = allSortedAirportsCode[counter];
            if(this.allAirports.get(airportCode)) {
                busiestAirport.push(this.allAirports.get(airportCode))
                counter++;
            }
        }

        this.busiestAirports = busiestAirport;

        return this.busiestAirports;
    }


    /**
     * Gets the Top X Busiest Airports' Icao Codes
     */
    getBusiestAirportIcaoCodes() {
        if(!this.flights) throw "No Flight Data Avaialble";
        const flightsAtAirport = this.getAllFlightsAtAirport(this.flights);
        return Object.keys(flightsAtAirport)
            .sort((a,b) => {
                return flightsAtAirport[b]- flightsAtAirport[a];
            });
    }

    /**
     * Returns the total of Inbound/Outbound flights at 
     * all the airports based on flights info
    */
    getAllFlightsAtAirport(flights) {
        if(!flights) throw "Flights is undefined";
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