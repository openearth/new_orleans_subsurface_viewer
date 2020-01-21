import convert from 'xml-js';
import baseRepo from './_base';
import { map, path, pathOr, compose } from 'ramda';
import formatIdToLabel from '@/lib/format-id-to-label';
import { xmlRequestTemplate } from './_xml-template';
import store from '../store/mapbox.store';

const transectRepo = {


  getTransect(lineCoordinates) {
    var self = this;
    const template = xmlRequestTemplate({
      functionId: 'transect',
      transect: lineCoordinates
    });

    // console.log("Getting section..");

    return baseRepo({
      method: 'post',
      data: demoTemplate,
      headers: {'Content-Type': 'application/xml'},

    })
    // .then(({ data }) => convert.xml2js(data, { compact: true, spaces: 2}))
    .then(data => formatDataIntoLinks(data, self));
  },



};
function formatDataIntoLinks(data) {
  // 🐏

  console.log("input data into formatDataIntoLinks is ", data);
  const formatLink = feature => {
  const url = path([],feature);
    return {
      name: "Transect plot",
      url
    };
  };

  const buildLinks = compose(
    map(formatLink),
    val => Array.isArray(val) ? val : [val],
    pathOr([], ['data'])
  );

    // console.log("lala",buildLinks(data));
  return buildLinks(data);
}


const demoTemplate = `<wps:Execute xmlns:wps="http://www.opengis.net/wps/1.0.0" version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
<ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">transect</ows:Identifier>
<wps:DataInputs>
  <wps:Input>
    <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">transect</ows:Identifier>
    <ows:Title xmlns:ows="http://www.opengis.net/ows/1.1">Please draw a transect [double-click to finish] and click Execute</ows:Title>
    <wps:Data>
      <wps:LiteralData>LINESTRING(-90.1197731318735 29.98685068527969,-90.1197731318735 29.973719255153)</wps:LiteralData>
    </wps:Data>
  </wps:Input>
</wps:DataInputs>
<wps:ResponseForm>
  <wps:RawDataOutput mimeType="application/json">
    <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">transect_plot</ows:Identifier>
  </wps:RawDataOutput>
</wps:ResponseForm>
</wps:Execute>`;

export default transectRepo;
