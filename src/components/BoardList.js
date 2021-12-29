import PropTypes from "prop-types";
import Board from "./Board";

// this is finalized
const BoardList = (props) => {
  console.log(props)
  
  const boardComponents = props.boards.map((board) => {
    return (
      <li>
        <Board board={board} onBoardSelect={props.selectBoard}></Board>
      </li>
    );
  });
  return (
    <section>
      <h2>Board List</h2>
      <ul>{boardComponents}</ul>
    </section>
  );
};
BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ),
  // onUpdateBoard: PropTypes.func.isRequired,
  selectBoard: PropTypes.func.isRequired
};
export default BoardList;
