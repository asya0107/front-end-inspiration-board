const Board = (props) => {
  return (
    <div onClick={() => props.onBoardSelect(props.board)}>
      <p>
        {" "}
        {props.board.title}{" "}
        <span
          className="card-footer-icon"
          onClick={() => props.deleteOneBoard(props.board)}
        >
          🗑
        </span>
      </p>
    </div>
  );
};

export default Board;