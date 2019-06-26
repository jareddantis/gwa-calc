if (process.env.NODE_ENV === 'production') {
  module.exports = require('./config/vue.prd.js');
} else {
  module.exports = require('./config/vue.dev.js');
}
