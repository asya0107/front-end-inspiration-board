front-end-inspiration-board/src/components/NewBoardForm.js /
@asya0107
asya0107 board, boardlist, and newboard form finished
Latest commit 0757b53 4 days ago
 History
 2 contributors
@ashapa@asya0107
56 lines (55 sloc)  1.42 KB
   
import { useState } from 'react';
import PropTypes from "prop-types";

const newBoardForm = (props) => {
   const [formFields, setFormFields] = useState({
       title: '',
       owner: ''
   });
   const onTitleChange = (event) => {
       setFormFields({
           ...formFields,
           title: event.target.value
       })
   };
   const onOwnerChange = (event) => {
       setFormFields({
           ...formFields,
           owner: event.target.value
       })
   };
const onFormSubmit = (event) => {
       event.preventDefault();
       props.addBoardCallback({
           title: formFields.title,
           owner: formFields.owner
       });
       setFormFields({
           title: '',
           owner: '',
       });
   };
   return (
       <form onSubmit={onFormSubmit}>
           <div>
               <label htmlFor="fulltitle">title:</label>
               <input
                   title="fulltitle"
                   value={formFields.title}
                   onChange={ontitleChange} />
           </div>
           <div>
               <label htmlFor="owner">owner:</label>
               <input title="owner"
                   value={formFields.owner}
                   onChange={onownerChange} />
           </div>
           <input
               type="submit"
               value="Add Board" />
      </form>
   );
};
NewBoardForm.propTypes = {
   addBoardCallback: PropTypes.func.isRequired
};
export default NewBoardForm;
