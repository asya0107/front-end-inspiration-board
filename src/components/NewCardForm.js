import { useState } from "react";

const NewCardForm = (props) => {
  const [message, setMessage] = useState("");
  const messageChangeHandler = (changeEvent) => {
    setMessage(changeEvent.target.value);
  };

  const submitNewCard = (submitEvent) => {
    submitEvent.preventDefault();
    const newCard = { message };
    props.postNewCard(newCard);
    setMessage("");
  };

  const messageLength = () => {
    if (message.length === 0 || message.length > 40) {
      return <input className="invalid-form-input"></input>;
    } else {
      return <input className=""></input>;
    }
  };

  return (
    <section className="new-card-form-container">
      <h2>Create a New Card</h2>
      <form onSubmit={submitNewCard} className="new-card-form">
        <input
          type="text"
          className={messageLength}
          onChange={messageChangeHandler}
          value={message}
          placeholder="Message"
          required
        ></input>
        <p>Preview: {message}</p>
        <input
          type="Submit"
          disabled={message.length === 0 || message.length > 40}
          className="submit-button"
        ></input>
      </form>
    </section>
  );
};

export default NewCardForm;
