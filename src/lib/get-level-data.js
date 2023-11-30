import buildGeoServerUrl from './build-geoserver-url';
import mapChartData from '@/lib/map-chart-data';
import xmlToJson from '@/lib/xml-to-json';

/**
 * Get PH data for a location based on the PH id.
 *
 * @param {string} id - The PH id.
 * @returns {Promise} - An object with PH data.
 */
export default async function getLevelData ({ id }) {
  const url = buildGeoServerUrl({
    url: 'https://new-orleans.openearth.eu/wps',
    request: 'execute',
    service: 'WPS',
    version: '1.0.0',
    Identifier: 'monitoring_timeseries',
    datainputs: `loc_id=${ id }`,
  });

  return fetch(url)
    .then(response => response.text())
    .then(string => {
      const rawData = xmlToJson(string);

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
    })
    .catch(err => Promise.reject(err));
}