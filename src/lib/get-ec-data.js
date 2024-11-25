import buildGeoServerUrl from './build-geoserver-url';
import mapChartData from '@/lib/map-chart-data';
import xmlToJson from "./xml-to-json";


/**
 * Get electrical conducivity data for a location based on the location id.
 *
 * @param {string} id - The loc id.
 * @returns {Promise} - An object with electrical conductivity data.
 */

export default async function getECData({ id }) {
    console.log("id", id)
  const url = buildGeoServerUrl({
    url: "https://new-orleans.openearth.eu/wps",
    request: "execute",
    service: "WPS",
    identifier: "monitoring_timeseries",
    version: "1.0.0",
    datainputs: `locationinfo=%7b%22locid%22:%22${id}%22,%22parameter%22:%22Electrical%20Conductivity:Handmeasurement%22%7d`,
    
  });
  console.log("url", url)

  return fetch(url)
    .then((response) => response.text())
    .then((string) => {
      const rawData = xmlToJson(string);
      if (rawData) {
        const value = {
          parameters: rawData.parameterproperties,
          properties: rawData.locationproperties,
          statistics: rawData.locationstats,
          timeseries: mapChartData(rawData.timeseries, { showHours: false }),
        };
        if (value.errMsg) {
          return Promise.reject(value.errMsg);
        }
        return value ? value : null;
      }
    }).catch(err => Promise.reject(err));
}
