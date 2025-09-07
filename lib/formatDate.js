// export const formatMyDate = (date) => {
//   let options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   };
//   const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
//   return formattedDate;
// };

export const formatMyDate = (date) => {
  if (!date) return "Invalid date"; // ⛔ null or undefined
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid date"; // ⛔ Not a real date
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(parsedDate);
};
