import 'firebase-admin';

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'resourceApi') {
  exports.resourceApi = require('./resourceApi');
}
