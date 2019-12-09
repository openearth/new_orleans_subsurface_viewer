export default function buildGeojsonLayer({ id, data, type, paint={}, layout={} }) {
  return {
    id,
    type,
    source: {
      tolerance: 3.5,
      type: 'geojson',
      data
    },
    layout,
    paint
  };
}
