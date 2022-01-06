import { MdDeleteForever } from "react-icons/md";

const Card = (props) => {
  return (
    <div className="card">
      <p className="card-message">{props.card.message}</p>
      <div className="card-footer">
        <p>{props.card.likes_count} 💜</p>
        <p
          className="card-footer-icon"
          onClick={() => props.plusOneToCard(props.card)}
        >
          +1
        </p>
        <MdDeleteForever
          className="delete-icon"
          onClick={() => props.deleteOneCard(props.card)}
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Card;
