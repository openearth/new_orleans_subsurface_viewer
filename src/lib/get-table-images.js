const EXTENSIONS = [ 'jpg', 'jpeg', 'png' ];
const DOMAIN = 'https://new-orleans.openearth.eu';

/**
 * Get water quality table images for a location Id.
 * Since we don't know what images are available, we try a few different extesions.
 *
 * @param {string} id - The location Id.
 * @returns {Promise} - An array of available image urls.
 */
export default async function getTableImages ({ id }) {
  const tableUrls = EXTENSIONS.map(ext => `${ DOMAIN }/static/waterkwaliteitsmonsters/${ id }.${ ext }`);
  const fetches = [ ...tableUrls ].map(url => fetch(url));

  const urls = await Promise.all(fetches)
    .then(res => res.filter(res => res.ok).map(res => res.url))
    .catch(() => null);

    console.log(urls);

  return urls.filter(url => url);
}