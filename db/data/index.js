const ENV = process.env.NODE_ENV;

const testData = require('./test/index');
const devData = require('./dev/index');

const data = {
  test: testData,
  development: devData,
};

module.exports = data[ENV];
