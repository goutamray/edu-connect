import Rating from "@/app/(main)/courses/[id]/_components/Rating";

const StarRating = ({ rating }) => {
  const stars = new Array(rating).fill(0);
  return (
    <>
      {stars.map((star, index) => (
        <Rating key={index} />
      ))}
    </>
  );
};

export default StarRating;
