const RatingMessages: { [key: number]: JSX.Element } = {
  1: <p>Very bad recipe</p>,
  2: <p>Bad recipe</p>,
  3: <p>It's mid</p>,
  4: <p>I liked it</p>,
  5: <p>Really loved it</p>,
};

interface RatingDescriptionProps {
  rating: number;
}

const RatingDescription = ({ rating }: RatingDescriptionProps) => {
  const ratingMessage = RatingMessages[rating] || null;

  return ratingMessage;
};

export default RatingDescription;
