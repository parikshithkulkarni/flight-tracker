class OpenSkyAPI {

    constructor() {
        this._openSkyRootURL = "https://opensky-network.org/api";
        this._iataCodesRootURL = "https://iatacodes.org/api/v6";
        this._iataApiKey = "817c32cd-b85f-444d-8e00-a1b385a837a4";
    }

    getOpenSkyRootURL() {
        return this._openSkyRootURL;
    }

    getIataCodesRootURL() {
        return this._iataCodesRootURL;
    }

    getAllFlightsURL(begin, end) {
        const endpoint = '/flights/all?' + this._queryParams({ begin, end });
        return `${this.getOpenSkyRootURL() + endpoint}`;
    }

    getAirportURL(icao) {
        const endpoint = '/airports?' + this._queryParams({ icao });
        return `${this.getOpenSkyRootURL() + endpoint}`;
    }

    static arrayToStringReducer(arr, callback) {
        return arr.reduce((acc, data) =>
            acc += ((callback) ? callback(data) : data)
            , "");
    }

    /* HELPER METHODS */
    _queryParams(params) {
        return Object.keys(params).map(key => key + '=' + params[key]).join('&')
    }

}

export default OpenSkyAPI;