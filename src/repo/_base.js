import axios from 'axios';

const baseURL = 'http://tl-ng050.xtr.deltares.nl/wps';
const baseRepo = axios.create({
    baseURL
});

export default baseRepo;
