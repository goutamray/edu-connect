/**
 *
 * @param {*} array
 * @returns
 */
// export const replaceMongoIdInArray = (array) => {
//   const mappedArray = array
//     .map((item) => {
//       return {
//         id: item._id.toString(),
//         ...item,
//       };
//     })
//     .map(({ _id, ...rest }) => rest);

//   return mappedArray;
// };

export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id?.toString?.(), // ✅ Safe call — won't crash
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

// /**
//  *
//  * @param {*} obj
//  * @returns
//  */
// export const replaceMongoIdInObject = (obj) => {
//   const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
//   return updatedObj;
// };

/**
 * Replace Mongo _id with id (string)
 */
// lib/convertData.js
export const replaceMongoIdInObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(replaceMongoIdInObject);
  }

  if (obj && typeof obj === "object") {
    const newObj = {};

    for (const key in obj) {
      const value = obj[key];

      if (key === "_id") {
        newObj["id"] = value?.toString?.();
      } else if (typeof value === "object" && value !== null) {
        newObj[key] = replaceMongoIdInObject(value);
      } else {
        newObj[key] = value;
      }
    }

    return newObj;
  }

  return obj;
};
