let superagent;

// Singleton
const getSuperagent = () => {
  if (!superagent) {
    superagent = require('superagent'); // eslint-disable-line global-require
  }

  return superagent;
};

module.exports = getSuperagent();
