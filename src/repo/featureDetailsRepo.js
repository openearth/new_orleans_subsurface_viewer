import { stringify } from 'query-string';
import baseRepo from './_base';

const params = stringify({
  request: 'execute',
  service: 'WPS',
  identifier: 'borehole_data',
  version: '1.0.0',
  datainputs: `input_id=12`
}, {
  encode: false
});
// ?request=execute&service=WPS&identifier=borehole_data&version=1.0.0&datainputs=input_id=12

const featureDetailsRepo = {

  getReport(uid) {
    console.log('getting report');
    console.log(params);
    return baseRepo({
        method: 'get',
        params: {
          request: 'execute',
          service: 'WPS',
          identifier: 'borehole_data',
          version: '1.0.0',
          datainputs: `input_id=${ uid }`
        }
    });
  }

};

export default featureDetailsRepo;
