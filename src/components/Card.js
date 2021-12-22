import PropTypes from "prop-types";
import { useState } from 'react';

const Card = (props) => {
   const displayCardInfo = () => {
       const updatedCard = {
           cardId: props.card_id,
           message: props.message,
           likesCount: props.likes_count,
           boardId: props.board_id
       }
       // Invoke the function passed in through the prop named “onUpdate”
       // This function is referenced by the name “updateStudentData” in App
       props.onUpdate(updatedCard);
   };
  //  const increaseLikes = () => {
    const [likesCount, setLikesCount] = useState(0);
    const increaseLikes = () => {
        console.log('We\'re inside increaseLikes!');
        setLikesCount(likesCount + 1);
};

   return (
     <div>
       <ul>
         <li>{props.message}</li>
       </ul>
       <section>{props.likesCount}</section>
       <button onClick={increaseLikes}>👍🏾</button>
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