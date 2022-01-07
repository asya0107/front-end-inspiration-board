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

  const submitNewBoard = (submitEvent) => {
    // prevent the default behavior of html forms from refreshing the page when a form is submitted
    submitEvent.preventDefault();
    // call the createNewBoard function that was passed into the <NewBoardForm> component(as a prop from within App.js) in order to create a new board upon submission of a new board form
    // line 23 passes in a new object(containing the current state of formFields) to the createNewBoard function
    props.createNewBoard({
      title: formFields.title,
      owner: formFields.owner,
    });

    // reset the formFields to be empty again
    setFormFields({
      title: "",
      owner: "",
    });
  };

  const titleLength = () => {
    if (formFields.title.length === 0 || formFields.title.length > 40) {
      return "invalid-input";
    } else {
      return "";
    }
  };

  const ownerLength = () => {
    if (formFields.owner.length === 0 || formFields.owner.length > 40) {
      return "invalid-input";
    } else {
      return "";
    }
  };

  return (
    <form onSubmit={submitNewBoard} className="new-board-form">
      <input
        type="text"
        // The <input> element has its value set by state
        value={formFields.title}
        onChange={titleChangeHandler}
        className={titleLength()}
        placeholder="Title"
        required
      ></input>
      <input
        type="text"
        value={formFields.owner}
        onChange={ownerChangeHandler}
        className={ownerLength()}
        placeholder="Owner's Name"
        required
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
        className="submit-button"
      ></input>
    </form>
  );
};

export default NewBoardForm;
