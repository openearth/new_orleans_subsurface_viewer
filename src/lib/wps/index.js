import axios from 'axios';
import { xmlRequestTemplate } from './template';

export default function({ functionId, requestData, polygon, roadsIdentifier, ...rest }) {
  const template = xmlRequestTemplate({ functionId, requestData, polygon, roadsIdentifier, ...rest });

  return axios({
    method: 'post',
    url: process.env.VUE_APP_WPS_URL,
    data: template,
    headers: {'Content-Type': 'application/xml'}
  })
  .then(({ data }) => {
    return typeof data === 'object'
      ? data
      : JSON.parse(data);
  });
}
