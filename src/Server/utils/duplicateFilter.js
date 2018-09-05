/* eslint-disable */
exports.removeObjectDuplicates = (filterArr, prop) => {
  return filterArr.filter((obj, index, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === index;
  });
};
