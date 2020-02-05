const NEW_ORLEANS_CENTER_LATITUDE = 30.00;
const NEW_ORLEANS_CENTER_LONGITUDE = -90.08;



export const MAP_CENTER = [
  NEW_ORLEANS_CENTER_LONGITUDE,
  NEW_ORLEANS_CENTER_LATITUDE
];

export const MAP_ZOOM = 11;

export const MAP_BASELAYERS = [
  'light',
  'satellite',
].map(layer => ({
  style: `mapbox://styles/mapbox/${ layer }-v9`,
  title: layer,
  thumbnail: `/thumbnails/${ layer }.png`
}));

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0];
