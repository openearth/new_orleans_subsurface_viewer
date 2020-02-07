import buildGeoserverUrl from './build-geoserver-url';

export default layer => buildGeoserverUrl({
  request: 'GetLegendGraphic',
  service: 'WMS',
  format: 'image/png',
  width: 20,
  height: 20,
  layer
});
