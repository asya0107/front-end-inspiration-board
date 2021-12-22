import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";
// import axios from "axios";
import Board from "./components/Board";

function App() {
  const [boardsInfo, setBoardsInfo] = useState([]);
   const [selectedBoard, setSelectedBoard] = useState({
     title: "",
     owner: "",
     board_id: null,
   });

   const selectBoard = (board) => {
     setSelectedBoard(board);
   };
   const boardsElements = boardsInfo.map((board) => {
     return (
       <li>
         <Board board={board} onBoardSelect={selectBoard}></Board>
       </li>
     );
   });
  return (
    <div className="content">
      <h1>Inspiration Board</h1>
      <section>
        <h2>Boards</h2>
        <ol className="boards-list">{boardsElements}</ol>
      </section>
      <section>
        <h2>Selected Board</h2>
        <p>
          "Select a Board from the Board List!"
        </p>
      </section>
    </div>
  );
}

export default App;
