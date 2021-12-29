
   
import { useState } from 'react';
import PropTypes from "prop-types";

const NewBoardForm = (props) => {
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
   const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  const toggleNewBoardForm = () => {
    setIsBoardFormVisible(!isBoardFormVisible);
  };
   return (
       <section>
        <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="fulltitle">title:</label>
                <input
                    title="fulltitle"
                    value={formFields.title}
                    onChange={onTitleChange} />
            </div>
            <div>
                <label htmlFor="owner">owner:</label>
                <input title="owner"
                    value={formFields.owner}
                    onChange={onOwnerChange} />
            </div>
            <input
                type="submit"
                value="Add Board" />
        </form>
        <span
        onClick={toggleNewBoardForm}
        className="new-board-form__toggle-btn"
        >
        {isBoardFormVisible
            ? "Hide New Board Form"
            : "Show New Board Form"}
        </span>
        </section>
    );
    };
// newBoardForm.propTypes = {
// addBoardCallback: PropTypes.func.isRequired
// };

export default NewBoardForm;
