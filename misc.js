'use strict';
module.exports = {
  randomInArray: (array) => {
    return array[Math.floor(Math.random() * array.length)];
  },
  shuffleArray: (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
  derange: (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * i); // no +1 here!
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },
   shuffle: (array) => {
    var i = array.length,
        j = 0,
        temp;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
};
