import buildGeoserverUrl from './build-geoserver-url';
import { CUSTOM_LAYERS } from './constants';

const buildLegend = ({ id, layer }) => ({
  id,
  url: buildGeoserverUrl({
    request: 'GetLegendGraphic',
    service: 'WMS',
    format: 'image/png',
    width: 40,
    height: 60,
    layer
  })
});

export default [
  buildLegend(CUSTOM_LAYERS.OPERATOR_COSTS),
  buildLegend(CUSTOM_LAYERS.SOCIETAL_COSTS),
  buildLegend(CUSTOM_LAYERS.PRIORITIES)
];
