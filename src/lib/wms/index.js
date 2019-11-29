export default function({ id, layer, tiles=[], tileSize=512, paint={} }) {
  return {
    id,
    layer,
    type: 'raster',
    source: {
      type: 'raster',
      tiles,
      tileSize,
    },
    paint
  };
}
