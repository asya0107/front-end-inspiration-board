import { useState } from "react";

const NewCardForm = (props) => {
  const [message, setMessage] = useState("");
  // For any element to listen to an event, we set an attribute on the element.
  // For click events, we set the onClick attribute.
  // When submitting a form, for submit events, we set the onSubmit attribute. To handle when an <input type="text"> element changes, we set the onChange attribute.
  // Event Handling Functions Can Accept 'event', meaning...
  // We can get details in our event-handling functions about the event that occurred.
  // When an <input> element is changed, it emits an event specifically named "change". This emitted "change" event is an object that contains all details about the event.
  // this means that anytime I type into an input field, the <input> element returns a change event(aka an onChange object)
  // MessageChangeHandler is the event Handler that updates state for the onChange attribute in <input>
  // MessageChangeHandler takes in one argument, changeEvent, which we expect to be information about the event that triggered our event handler.
  // Note: every event-handling function is automatically passed an Event object, whether we use it or not
  const messageChangeHandler = (changeEvent) => {
    // call the setMessage function so that the state(i.e. message) will now equal whatever the input value is
    setMessage(changeEvent.target.value);
  };

  const submitNewCard = (submitEvent) => {
    submitEvent.preventDefault();
    const newCard = {message}
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
        {/* the <input type="text"> element listens for change events. By setting the value of
        onChange to messageChangeHandler, the web app invokes messageChangeHandler whenever we
        change the input */}
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