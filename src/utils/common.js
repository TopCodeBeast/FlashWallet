const shallowEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

const checkArrayIsSame = (array1, array2) => {
  if (!(Array.isArray(array1) && Array.isArray(array2))) {
    return false;
  }
  if (array1.length !== array2.length) {
    return false;
  }
  let isSame = true;
  array1.forEach((el1, index1) => {
    let el2 = array2[index1];
    if (!shallowEqual(el1, el2)) {
      isSame = false;
    }
  });
  return isSame;
};

export {shallowEqual, checkArrayIsSame};
