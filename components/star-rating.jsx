import Rating from "@/app/(main)/courses/[id]/_components/Rating";

// const StarRating = ({ rating }) => {
//   const stars = new Array(rating).fill(0);
//   return (
//     <>
//       {stars.map((star, index) => (
//         <Rating key={index} />
//       ))}
//     </>
//   );
// };

const StarRating = ({ rating }) => {
  const stars = new Array(Number(rating)).fill(0); // <-- convert to number
  return (
    <>
      {stars.map((_, index) => (
        <Rating key={index} />
      ))}
    </>
  );
};

export default StarRating;
