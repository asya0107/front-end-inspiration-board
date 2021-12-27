import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import Board from "./components/Board";

function App() {
  const [boardsData, setBoardsData] = useState([
    {
      id: 1,
      message: "First card message",
      likes_count: 0,
    },
    {
      id: 2,
      message: "Second card message",
      likes_count: 0,
    },
    {
      id: 3,
      message: "Third card message",
      likes_count: 0,
    },
  ]);

  const [selectedBoard, setSelectedBoard] = useState({
    title: "",
    owner: "",
    board_id: null,
  });

  // const [boardsData, setBoardsData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/boards`, {})
  //     .then((response) => {
  //       setBoardsData(response.data);
  //     });
  // }, []);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  const boardsElements = boardsData.map((board) => {
    return (
      <li>
        <Board board={board} onBoardSelect={selectBoard}></Board>
      </li>
    );
  });

  const createNewBoard = (newBoard) => {
    // Duplicate the board list
    const newBoardList = [...boardsData];

    // Logic to generate the next valid board ID
    // '(board) => board.id' is a function that returns the id of a board object;
    // map calls this function on every element in the newBoardList array, and returns an array of ids
    //
    const nextId = Math.max(...newBoardList.map((board) => board.id)) + 1;

    // Push the new piece of data(that includes the generated nextId), and
    // assign it to key:value pairs in an object to be added to the
    // newStudentList(which is a list of objects)
    newBoardList.push({
      id: nextId,
      title: newBoard.title,
      owner: newBoard.owner,
    });
    // Update the boardsData
    setBoardsData(newBoardList);
  };

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

  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  const toggleNewBoardForm = () => {
    setIsBoardFormVisible(!isBoardFormVisible);
  };

  const deleteAll = () => {
    if (
      window.confirm("Are you really sure? Please be gentle with this demo.")
    ) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/destroy_all`)
        .then((response) => {
          console.log("response", response.data);
          setBoardsData([response.data.default_board]);
          setSelectedBoard({
            title: "",
            owner: "",
            board_id: null,
          });
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("Something went wrong! :(");
        });
    }
  };

  return (
    <div className="page__container">
      <div className="content__container">
        <h1>Inspiration Board</h1>
        <section className="boards__container">
          <section className="new-board-form__container">
            <h2>Create a New Board</h2>
            {isBoardFormVisible ? (
              <NewBoardForm createNewBoard={createNewBoard}></NewBoardForm>
            ) : (
              ""
            )}
            <span
              onClick={toggleNewBoardForm}
              className="new-board-form__toggle-btn"
            >
              {isBoardFormVisible
                ? "Hide New Board Form"
                : "Show New Board Form"}
            </span>
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
        {selectedBoard.board_id ? (
          <CardsList board={selectedBoard}></CardsList>
        ) : (
          ""
        )}
      </div>
      <footer>
        <span>This is a demo! Please be gentle!</span> Click{" "}
        <span onClick={deleteAll} className="footer__delete-btn">
          here
        </span>{" "}
        to delete all boards and cards!
      </footer>
    </div>
  );
}

export default App;
