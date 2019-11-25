import buildGeoserverUrl from './build-geoserver-url';
import wms from './mapbox/layers/wms';
import { CUSTOM_LAYERS } from './constants';

export const generateWmsLayer = ({ url, id, layer, style='', paint={} }) => {
  const tile = buildGeoserverUrl({
    url,
    service: 'WMS',
    request: 'GetMap',
    layers: layer,
    style,
    width: 256,
    height: 256,
    srs: 'EPSG:3857',
    transparent: true,
    bbox: '{bbox-epsg-3857}',
    format: 'image/png',
    encode: false
  });

  return wms({
    id,
    tiles: [ tile ],
    tileSize: 256,
    paint
  });
};

export const operatorCosts = generateWmsLayer(CUSTOM_LAYERS.OPERATOR_COSTS);

export const societalCosts = generateWmsLayer(CUSTOM_LAYERS.SOCIETAL_COSTS);

export const priorities = generateWmsLayer(CUSTOM_LAYERS.PRIORITIES);
