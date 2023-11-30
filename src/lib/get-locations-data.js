import buildGeoServerUrl from './build-geoserver-url';

/**
 * Get locations data.
 *
 * @returns {Promise} - An object with locations data.
 */
export default async function getLocationsData () {
  const url = await buildGeoServerUrl({
    url: 'https://new-orleans.openearth.eu/wps',
    request: 'execute',
    service: 'WPS',
    version: '1.0.0',
    Identifier: 'monitoring_well',
  });

  return fetch(url)
    .then(response => response.text())
    .then(string => {
      const document = new window.DOMParser().parseFromString(string, 'text/xml');
      const element = document.getElementsByTagName('wps:ComplexData');
      const value = JSON.parse(element[0].textContent);

      if (value.errMsg) {
        return Promise.reject(value.errMsg);
      }

      return value ? value : null;
    })
    .catch(err => Promise.reject(err));
}