/**
 *
 * @param {*} array
 * @returns
 */
export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
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
export const replaceMongoIdInObject = (obj) => {
  if (!obj) return null; // jodi null/undefined ase tahole null return

  if (!obj._id) return obj; // jodi _id na thake tahole object as-is return

  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};
