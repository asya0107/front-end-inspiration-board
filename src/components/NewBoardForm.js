import { useState } from "react";

const NewBoardForm = (props) => {
  const [formFields, setFormFields] = useState({
    title: "",
    owner: "",
  });
  const titleChangeHandler = (changeEvent) => {
    setFormFields({ ...formFields, title: changeEvent.target.value });
  };
  const ownerChangeHandler = (changeEvent) => {
    setFormFields({ ...formFields, owner: changeEvent.target.value });
  };

  const submitNewBoard = (submitEvent) => {
    submitEvent.preventDefault();
    props.createNewBoard({
      title: formFields.title,
      owner: formFields.owner,
    });

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
