const utils = {
  doorState(state) {
    var current = 'not open';
    if (state === 1) {
      current = 'open';
    }

    return current;
  }
};

module.exports = utils;
