import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";
import BoardList from "./components/BoardList";

function App() {
  const [boardsData, setBoardsData] = useState([
    {
      id: 1,
      title: "Board 1",
      owner: "Asya",
    },
    {
      id: 2,
      title: "Board 2",
      owner: "Asha",
    },
    {
      id: 3,
      title: "Board 3",
      owner: "Audrey",
    },
  ]);

  const [selectedBoard, setSelectedBoard] = useState({
    title: "",
    owner: "",
    board_id: null,
  });
  // this is the get request we need
  useEffect(() => {
    axios
      .get("http://localhost:5000/boards")
      .then((response) => {
        setBoardsData(response.data);
        console.log(response.data)
      });
  }, []);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  // this is to use for dummy data
  const createNewBoard = (newBoard) => {
    const newBoardList = [...boardsData];

    const nextId = Math.max(...newBoardList.map((board) => board.id)) + 1;

    newBoardList.push({
      id: nextId,
      title: newBoard.title,
      owner: newBoard.owner,
    });
    // Update the boardsData
    setBoardsData(newBoardList);
  };
  // request section DO NOT DELETE
  // const createNewBoard = (newBoard) => {
  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard)
  //     .then((response) => {
  //       console.log("Response:", response.data.board);
  //       const boards = [...boardsData];
  //       boards.push(response.data.board);
  //       setBoardsData(boards);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //       alert("Couldn't create a new board.");
  //     });
  // };

  return (
    <div className="page__container">
      <BoardList selectBoard = {selectBoard} boards = {boardsData}/>
      <footer>
        {/* <span onClick={deleteAll} className="footer__delete-btn">
          here
        </span>{" "} */}
        <span className="footer__delete-btn">
          Click here
        </span>{" "}
        to delete all boards and cards!
      </footer>
    </div>
  );
}

export default App;

{/* <div className="content__container">
  <h1>Inspiration Board</h1>
  <section className="boards__container">
    <section className="new-board-form__container">
      <h2>Create a New Board</h2>
      {isBoardFormVisible ? (
        <NewBoardForm createNewBoard={createNewBoard}></NewBoardForm>
      ) : (
        ""
      )}
    </section>
    <section>
      <h2>Boards</h2>
      <ol className="boards__list">{boardsElements}</ol>
    </section>
    <section>
      <h2>Selected Board</h2>
      <p>
        {selectedBoard.board_id
          ? `${selectedBoard.title} - ${selectedBoard.owner}`
          : "Select a Board from the Board List!"}
      </p>
    </section>
  </section>
  {selectedBoard.board_id ? <CardsList board={selectBoard}></CardsList> : ""}
</div>; */}
