const apiKey = require('../config/keyConfig.json');

const openWeatherKey = apiKey.openWeather;
const googleMapKey = apiKey.googleMap;

const apiKey = {
    openWeatherKey : openWeatherKey,
    googleMapKey : googleMapKey,
}

module.exports = apiKey;
