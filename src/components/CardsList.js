import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import NewCardForm from "./NewCardForm";

const CardsList = (props) => {
  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      messageData: "First card message",
    },
    {
      id: 2,
      messageData: "Second card message",
    },
    {
      id: 3,
      messageData: "Third card message",
    },
  ]);

  const postNewCard = (newCard) => {
    // creates an array of sorted ids
    // '(card) => card.id' is a function that returns the id of a card object; map call this function on every element in the cardsData array
    const sortedId = cardsData.map((card) => card.id).sort();
    // sortedId.length - 1 <- the index the sortedId array, +1 increments the next number in the array
    const newId = sortedId[sortedId.length - 1] + 1;
    // line 30 mimics getting a response from the server
    // ...newCard copies all the properties of newCard
    const cards = [...cardsData, { ...newCard, id: newId }];

    setCardsData(cards);
  };

  const deleteCardItem = (selectedCard) => {
    // filter returns a new array with only the elements where the filter expression: card.id !== selectedCard.id returns true
    // this filter expression is saying, "I only want the cards that don't have the selectedCard.id"
    setCardsData(cardsData.filter((card) => card.id !== selectedCard.id));
  };

  // const CardsList = (props) => {
  // const [cardsData, setCardsData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.board_id}/cards`
  //     )
  //     .then((response) => {
  //       setCardsData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //       alert("Couldn't get cards for this board.");
  //     });
  // }, [props.board]);

  // const deleteCardItem = (card) => {
  //   axios
  //     .delete(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}`)
  //     .then((response) => {
  //       const newCardsData = cardsData.filter((existingCard) => {
  //         return existingCard.card_id !== card.card_id;
  //       });
  //       setCardsData(newCardsData);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //       alert("Couldn't delete the card.");
  //     });
  // };

  // const plusOneCardItem = (card) => {
  //   axios
  //     .put(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}/like`)
  //     .then((response) => {
  //       const newCardsData = cardsData.map((existingCard) => {
  //         return existingCard.card_id !== card.card_id
  //           ? existingCard
  //           : { ...card, likes_count: card.likes_count + 1 };
  //       });
  //       setCardsData(newCardsData);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //       alert("Couldn't +1 the card.");
  //     });
  // };

  const cardElements = cardsData.map((card) => {
    return (
      <Card
        card={card}
        // plusOneCardItem={plusOneCardItem}
        deleteCardItem={deleteCardItem}
      ></Card>
    );
  });

  // const postNewCard = (message) => {
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.board_id}/cards`,
  //       { message }
  //     )
  //     .then((response) => {
  //       const cards = [...cardsData];
  //       cards.push(response.data.card);
  //       setCardsData(cards);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //       alert("Couldn't create a new card.");
  //     });
  // };

  return (
    <section className="cards__container">
      <section>
        <h2>Cards for {props.board.title}</h2>
        <div className="card-items__container">{cardElements}</div>
      </section>
      <NewCardForm postNewCard={postNewCard}></NewCardForm>
    </section>
  );
};

export default CardsList;