
const requestAnimationFrame = function(callback, lastTime = 0) {
  const currTime = new Date().getTime();
  // const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
  const timeToCall = 9;
  lastTime = currTime + timeToCall;
  return setTimeout(function() {
      callback(currTime + timeToCall, lastTime);
    },
    timeToCall);
};

const cancelAnimationFrame = function(id) {
  clearTimeout(id);
};

module.exports = {
  requestAnimationFrame,
  cancelAnimationFrame
};