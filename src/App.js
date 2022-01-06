import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import BoardsList from "./components/BoardsList";

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({
    title: "",
    owner: "",
    board_id: null,
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
      .then((response) => {
        setBoardsData(response.data);
      });
  }, []);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  const createNewBoard = (newBoard) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard)
      .then((response) => {
        console.log("Response:", response.data);
        const boards = [...boardsData];
        boards.push(response.data);
        setBoardsData(boards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create a new board.");
      });
  };

  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  const hideNewBoardForm = () => {
    setIsBoardFormVisible(!isBoardFormVisible);
  };

  const deleteOneBoard = (board) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/boards/${board.board_id}`)
      .then((response) => {
        const newBoardsData = boardsData.filter((existingBoard) => {
          return existingBoard.board_id !== board.board_id;
        });
        setBoardsData(newBoardsData);
        setSelectedBoard({
          title: "",
          owner: "",
          board_id: null,
        });
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't delete the board.");
      });
  };

  const deleteBoards = () => {
    if (window.confirm("Are you really sure you want to delete all?")) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/boards`)
        .then((response) => {
          setBoardsData([]);
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

  const makeBoardFormVisible = () => {
    if (isBoardFormVisible) {
      return <NewBoardForm createNewBoard={createNewBoard}></NewBoardForm>;
    } else {
      return "";
    }
  };

  const hideBoardFormButton = () => {
    if (isBoardFormVisible) {
      return <span>Hide New Board Form</span>;
    } else {
      return <span>Show New Board Form</span>;
    }
  };

  const showSelectedBoard = (selectedBoard) => {
    if (selectedBoard.board_id) {
      return `${selectedBoard.title} - ${selectedBoard.owner}`;
    } else {
      return <p>Select a Board from the Board List!</p>;
    }
  };

  const showCardsList = () => {
    if (selectedBoard.board_id) {
      return <CardsList board={selectedBoard}></CardsList>;
    } else {
      return "";
    }
  };

  return (
    <div className="entire-page">
      <div>
        <h1>Inspiration Board</h1>
        <section className="boards-container">
          <section className="board-container">
            <h2>Create a New Board</h2>
            {makeBoardFormVisible()}
            <span onClick={hideNewBoardForm} className="hide-button">
              {hideBoardFormButton()}
            </span>
          </section>
          <section className="board-container">
            <BoardsList
              selectBoard={selectBoard}
              boards={boardsData}
              deleteOneBoard={deleteOneBoard}
            />
          </section>
          <section className="board-container">
            <h2>Selected Board</h2>
            <p>{showSelectedBoard(selectedBoard)}</p>
          </section>
        </section>
        {showCardsList()}
      </div>
      <footer>
        Click{" "}
        <span onClick={deleteBoards} className="footer-delete-button">
          here
        </span>{" "}
        to delete all boards and cards!
      </footer>
    </div>
  );
}

export default App;
