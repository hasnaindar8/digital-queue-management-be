exports.createLookupObject = (arr, key, value) => {
  const lookupObj = {};
  arr.forEach((obj) => {
    const lookupKey = obj[key];
    const lookupValue = obj[value];
    if (lookupKey && lookupObj) {
      lookupObj[lookupKey] = lookupValue;
    }
  });
  return lookupObj;
};
