import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "./components/CardsList";
import NewBoardForm from "./components/NewBoardForm";
import BoardsList from "./components/BoardsList";

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState({
    title: "",
    owner: "",
    board_id: null,
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
      // response is an object that contains data as a key. The value of data is another object
      // `data` is the response that was provided by the server
      .then((response) => {
        setBoardsData(response.data);
      });
  }, []);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  const createNewBoard = (newBoard) => {
    // newBoard is a new object created on line 23 in the NewBoardForm component, which contains key:value pairs of {title: 'Board 1', owner: 'Person 1'}. It will become the request body for this post request
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard)
      // response is an object containing several keys, one which is 'data', another of which is 'status'
      // axios defines "success" as any response with a 2XX status code. Therefore, responses with a 2XX status code will go into then, and all responses outside a 2XX status code will go into catch.
      .then((response) => {
        // 'response.data' is also an object: '{board_id: 1, owner: 'Person 1', title: 'Board 1'}', it's the data given back by the API response
        console.log("Response:", response.data);
        // duplicate boardsData(i.e. the state holding the list of boards) and store it in the const variable 'boards', which will help React detect the change to the list of boards
        const boards = [...boardsData];
        // push the new piece of data that came back from the sever(that includes the generated board_id), into boards (which is a list of objects)
        boards.push(response.data);
        setBoardsData(boards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create a new board.");
      });
  };

  const hideNewBoardForm = () => {
    setIsBoardFormVisible(!isBoardFormVisible);
  };

  const deleteOneBoard = (board) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/boards/${board.board_id}`)
      .then((response) => {
        // filter returns a new array with only the elements where the filter expression: 'existingBoard.board_id !== board.board_id' returns true
        // this filter expression is saying, "I only want the existing cards that don't have the passed in board.board_id"
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
          console.log("response", response.data);
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
