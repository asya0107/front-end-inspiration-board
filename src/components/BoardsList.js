import Board from "./Board";

const BoardsList = (props) => {
  console.log(props);
  const boardComponents = props.boards.map((board) => {
    return (
      <li>
        <Board board={board} onBoardSelect={props.selectBoard}></Board>
      </li>
    );
  });

  return (
    <section>
      <h2>Boards</h2>
      <ol >{boardComponents}</ol>
    </section>
  );
};

export default BoardsList;