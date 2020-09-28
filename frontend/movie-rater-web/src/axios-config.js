const axios = require('axios').default;

// Set config defaults when creating the instance
const axios_conf = axios.create({
	baseURL: 'http://localhost:8000/api/',
});

// Alter defaults after instance has been created
axios_conf.defaults.headers.common['Authorization'] =
	'Token 72e737511aa8aef767b8cb74b438a7c9f0ce2c2a';
axios_conf.defaults.headers.post['Content-Type'] = 'application/json';

export default axios_conf;
