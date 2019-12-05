import axios from 'axios';

const baseURL = `${ process.env.VUE_APP_SERVER_BASE_URL }/wps`;
const baseRepo = axios.create({
  baseURL
});

export default baseRepo;
