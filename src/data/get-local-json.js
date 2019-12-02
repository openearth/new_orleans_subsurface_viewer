export default function getLocalJson(fileName) {
  return import(/* webpackChunkName: "jsonData" */ `./${ fileName }`)
        .then(module => Object.freeze(module.default));
}
