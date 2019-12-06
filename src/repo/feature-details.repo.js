import convert from 'xml-js';
import { map, path, pathOr, compose } from 'ramda';
import formatIdToLabel from '@/lib/format-id-to-label';
import baseRepo from './_base';

const featureDetailsRepo = {

  getReport(identifier, uid) {
    return baseRepo({
        method: 'get',
        params: {
          request: 'execute',
          service: 'WPS',
          identifier,
          version: '1.0.0',
          datainputs: `input_id=${ uid }`
        }
    })
    .then(({ data }) => convert.xml2js(data, { compact: true, spaces: 2}))
    .then(data => {
      console.log(data);
      return data;
    })
    .then(data => formatDataIntoLinks(data))
    ;
  }

};

function formatDataIntoLinks(data) {
  // 🐏
  const formatLink = feature => {
    const id = path(['ows:Identifier', '_text'], feature);
    const url = path(['wps:Data', 'wps:ComplexData', '_cdata'], feature);
    return {
      id,
      name: formatIdToLabel(id),
      url
    };
  };

  const buildLinks = compose(
    map(formatLink),
    pathOr([], ['wps:ExecuteResponse', 'wps:ProcessOutputs', 'wps:Output'])
  );

  return buildLinks(data);
}

export default featureDetailsRepo;
