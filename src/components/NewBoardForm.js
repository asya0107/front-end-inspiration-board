import { useState } from "react";

const NewBoardForm = (props) => {
  const [formFields, setFormFields] = useState({
    title: "",
    owner: "",
  });
  const titleChangeHandler = (changeEvent) => {
    // ...formFields copies the formFields object & all its data(i.e. the data includes the current state of title and owner)
    // title: changeEvent.target.value sets the title atrribute, in the ...formFields object, to the equivalent value associated in the changeEvent object
    // The cloned ...formFields object will already have a title and owner key from the cloning, but listing the new value afterward will overwrite the cloned value.
    setFormFields({ ...formFields, title: changeEvent.target.value });
  };
  const ownerChangeHandler = (changeEvent) => {
    setFormFields({ ...formFields, owner: changeEvent.target.value });
  };

  const submitNewBoard = (e) => {
    e.preventDefault();
    props.createNewBoard({ title, owner });
    setTitle("");
    setOwner("");
  };

  return (
    <form onSubmit={submitNewBoard} className="new-board-form__form">
      <label>Title</label>
      <input
        type="text"
        // The <input> element has its value set by state
        value={formFields.title}
        onChange={titleChangeHandler}
        className={
          formFields.title.length === 0 || formFields.title.length > 40
            ? "invalid-form-input"
            : ""
        }
      ></input>
      <label>Owner's Name</label>
      <input
        type="text"
        value={formFields.owner}
        onChange={ownerChangeHandler}
        className={
          formFields.owner.length === 0 || formFields.owner.length > 40
            ? "invalid-form-input"
            : ""
        }
      ></input>
      <p>
        Preview: {formFields.title} - {formFields.owner}
      </p>
      <input
        type="Submit"
        disabled={
          formFields.title.length === 0 ||
          formFields.owner.length === 0 ||
          formFields.title.length > 40 ||
          formFields.owner.length > 40
        }
        className="new-board-form__form-submit-btn"
      ></input>
    </form>
  );
};

export default NewBoardForm;