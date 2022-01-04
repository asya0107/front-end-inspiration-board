import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import NewCardForm from "./NewCardForm";

// const CardsList = (props) => {
//   const [cardsData, setCardsData] = useState([
//     {
//       id: 1,
//       message: "First card message",
//       likes_count: 0,
//     },
//     {
//       id: 2,
//       message: "Second card message",
//       likes_count: 0,
//     },
//     {
//       id: 3,
//       message: "Third card message",
//       likes_count: 0,
//     },
//   ]);

// const postNewCard = (newCard) => {
//   // creates an array of sorted ids
//   // '(card) => card.id' is a function that returns the id of a card object; map calls this function on every element in the cardsData array, and returns an array of ids. sort() sorts those ids and stores them in the sortedId array from smallest to largest
//   const sortedId = cardsData.map((card) => card.id).sort();
//   // sortedId.length - 1 <- the index the sortedId array, +1 increments the next number in the array
//   const newId = sortedId[sortedId.length - 1] + 1;
//   // line 31 mimics getting a response from the server
//   // within the {}, ...newCard copies all the properties of newCard(message:message) and the key:value pair 'id: newId' gets added to my newCard object
//   // { ...newCard, id: newId } gets added as a property(or object) to the copy of the cardsData array
//   const cards = [...cardsData, { ...newCard, id: newId }];

//   setCardsData(cards);
// };

// const deleteOneCard = (card) => {
//   // filter returns a new array with only the elements where the filter expression: card.id !== selectedCard.id returns true
//   // this filter expression is saying, "I only want the cards that don't have the selectedCard.id"
//   setCardsData(
//     cardsData.filter((selectedCard) => selectedCard.id !== card.id)
//   );
// };

// const plusOneToCard = (card) => {
//   // map() takes a function(i.e. a function that returns an object) and calls it on every element in the cardsData array
//   // newCardsData is a new array of ojects that map() built
//   const newCardsData = cardsData.map((existingCard) => {
//     if (existingCard.id !== card.id) {
//       // existingCard is an object
//       return existingCard;
//     } else {
//       // { ...card, likes_count: card.likes_count + 1 } is an object
//       return { ...card, likes_count: card.likes_count + 1 };
//     }
//   });
//   setCardsData(newCardsData);
// };

const CardsList = (props) => {
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.board_id}/cards`
      )
      .then((response) => {
        setCardsData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't get cards for this board.");
      });
  }, [props.board.board_id]);

  const postNewCard = (message) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.board_id}/cards`,
        message
      )
      .then((response) => {
        const cards = [...cardsData];
        cards.push(response.data);
        setCardsData(cards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create a new card.");
      });
  };

  const deleteOneCard = (card) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}`)
      .then((response) => {
        // filter returns a new array with only the elements where the filter expression: 'existingCard.card_id !== card.card_id' returns true
        // this filter expression is saying, "I only want the existing cards that don't have the passed in card.card_id"
        const newCardsData = cardsData.filter((existingCard) => {
          return existingCard.card_id !== card.card_id;
        });
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't delete the card.");
      });
  };

  // const plusOneToCard = (card) => {
  //   axios
  //     .patch(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}`)
  //     .then((response) => {
  //       // map() takes a function(i.e. a function that returns an object), calls it on every element in the cardsData array and returns an array of objects.
  //       // newCardsData is a new array of ojects that map() built
  //       const newCardsData = cardsData.map((existingCard) => {
  //         if (existingCard.id !== card.card_id) {
  //           // existingCard refers to each object in the cardsData array
  //           return existingCard;
  //         } else {
  //           // within the {}, ...card copies all the key:value pairs of the passed in 'card' object and the key:value pair 'likes_count: card.likes_count + 1' gets added to the copy of the card object
  //           return { ...card, likes_count: card.likes_count + 1 };
  //         }
  //       });
  //       setCardsData(newCardsData);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //       alert("Couldn't +1 the card.");
  //     });
  // };

  const plusOneToCard = (card) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}`)
      .then((response) => {
        const cards = [...cardsData];
        cards.push(response.data);
        setCardsData(cards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't +1 the card.");
      });
  };

  const cardElements = cardsData.map((card) => {
    return (
      <Card
        card={card}
        plusOneToCard={plusOneToCard}
        deleteOneCard={deleteOneCard}
      ></Card>
    );
  });

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
