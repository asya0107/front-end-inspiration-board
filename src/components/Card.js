const Card = (props) => {
  return (
    <div className="card-item">
      <p className="card-item__message">{props.card.message}</p>
      <ul className="card-item__controls">
        <li>
          <p>{props.card.likes_count} 💜</p>
        </li>
        <li>
          <p onClick={() => props.plusOneToCard(props.card)}>+1</p>
        </li>
        <li>
          <p
            className="card-item__delete"
            onClick={() => props.deleteOneCard(props.card)}
          >
            Delete
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Card;
