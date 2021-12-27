
import PropTypes from "prop-types";

const Board = (props) => {
  // this is finalized
  return (
    <div onClick={() => props.onBoardSelect(props.board)}>
      {props.board.title}
    </div>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};
export default Board;
