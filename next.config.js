const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    ONEGRAPH_BUILD_API_TOKEN: process.env.ONEGRAPH_BUILD_API_TOKEN,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    ONEGRAPH_APP_ID: process.env.ONEGRAPH_APP_ID,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    };
  },
};
