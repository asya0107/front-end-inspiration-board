import PropTypes from "prop-types";
import Board from "./Board";

const BoardList = (props) => {
  const boardComponents = props.board.map((board, index) => {
    return (
      <li key={index}>
        <Board id={board.id} title={board.title} owner={board.owner}></Board>
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
  onUpdateBoard: PropTypes.func.isRequired,
};
export default BoardList;
