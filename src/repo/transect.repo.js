import baseRepo from './_base';
import { xmlRequestTemplate } from './_xml-template';

const transectRepo = {

  getTransect(lineCoordinates) {
    const template = xmlRequestTemplate({
      functionId: 'transect_geotop',
      transect_geotop: 'LINESTRING(487632.95204252 6796655.0806497,496193.89920926 6792986.1032925)'
    });

    console.log(template);

    return baseRepo({
      method: 'post',
      data: demoTemplate,
      headers: {'Content-Type': 'application/xml'}
    });
  },

  getTransectQs(lineCoordinates) {
    return baseRepo({
        method: 'get',
        params: {
          request: 'execute',
          service: 'WPS',
          identifier: 'transect_geotop',
          version: '1.0.0',
          datainputs: 'LINESTRING(487632.95204252 6796655.0806497,496193.89920926 6792986.1032925)'
        }
    })
    .then(({ data }) => {
      console.log(data);
    })
    ;
  }

};

const demoTemplate = `<wps:Execute xmlns:wps="http://www.opengis.net/wps/1.0.0" version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
<ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">transect_geotop</ows:Identifier>
<wps:DataInputs>
  <wps:Input>
    <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">transect_geotop</ows:Identifier>
    <ows:Title xmlns:ows="http://www.opengis.net/ows/1.1">Please draw a transect [double-click to finish] and click Execute</ows:Title>
    <wps:Data>
      <wps:LiteralData>LINESTRING(487632.95204252 6796655.0806497,496193.89920926 6792986.1032925)</wps:LiteralData>
    </wps:Data>
  </wps:Input>
</wps:DataInputs>
<wps:ResponseForm>
  <wps:RawDataOutput mimeType="application/json">
    <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">
      json
    </ows:Identifier>
  </wps:RawDataOutput>
</wps:ResponseForm>
</wps:Execute>`;

export default transectRepo;
