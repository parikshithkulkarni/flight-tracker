class OpenSkyAPI {

    constructor() {
        this._openSkyRootURL = "https://opensky-network.org/api";
    }

    getOpenSkyRootURL() {
        return this._openSkyRootURL;
    }

    getAllFlightsURL(begin, end) {
        const endpoint = '/flights/all?' + this._queryParams({ begin, end });
        return `${this.getOpenSkyRootURL() + endpoint}`;
    }

    getArrivalFlightsURL(airport, begin, end) {
        const endpoint = '/flights/arrival?' + this._queryParams({ airport, begin, end });
        return `${this.getOpenSkyRootURL() + endpoint}`;
    }

    getDepartureFlightsURL(airport, begin, end) {
        const endpoint = '/flights/departure?' + this._queryParams({ airport, begin, end });
        return `${this.getOpenSkyRootURL() + endpoint}`;
    }

    getAirportURL(icao) {
        const endpoint = '/airports?' + this._queryParams({ icao });
        return `${this.getOpenSkyRootURL() + endpoint}`;
    }

    /* HELPER METHODS */
    _queryParams(params) {
        return Object.keys(params).map(key => key + '=' + params[key]).join('&')
    }

}

export default OpenSkyAPI;