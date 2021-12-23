const Board = (props) => {
   const displayBoardInfo = () => {
       const updatedBoard = {
           id: props.id,
           title: props.title,
           owner: props.owner,
       }
       // Invoke the function passed in through the prop named “onUpdate”
       // This function is referenced by the name “updateStudentData” in App
       props.onUpdate(updatedBoard);
   };
   const showCards = props.isPresent ? 'green' : 'red';
   return (
       <div>
           <ul>
               <li>Board Title: {props.title}</li>
           </ul>
           <button onClick={showCards}>Toggle if {props.name} is present</button>
       </div>
   );
};
Board.propTypes = {
   id: PropTypes.number.isRequired,
   title: PropTypes.string.isRequired,
   owner: PropTypes.string.isRequired,
};
export default Board;
