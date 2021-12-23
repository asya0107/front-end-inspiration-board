import PropTypes from "prop-types";
import { useState } from "react";

const Card = (props) => {
  //  const increaseLikes = () => {
  const [likesCount, setLikesCount] = useState(0);
  const increaseLikes = () => {
    setLikesCount(likesCount + 1);
  };

  return (
    <div>
      <ul>
        <li>{props.card.message}</li>
      </ul>
      <li>
        <p>{props.card.likesCount}</p>
      </li>
      <li>
        <p onClick={() => increaseLikes(props.card)}>👍🏽</p>
      </li>
    </div>
  );
};
Card.propTypes = {
  cardId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
};
export default Card;
