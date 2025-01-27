import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import NewCardForm from "./NewCardForm";

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

  const plusOneToCard = (card) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}`)
      .then((response) => {
        const newCardsData = cardsData.map((existingCard) => {
          if (existingCard.card_id !== card.card_id) {
            console.log(existingCard.card_id);
            console.log(card.card_id);
            return existingCard;
          } else {
            return { ...card, likes_count: card.likes_count + 1 };
          }
        });
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't +1 the card.");
      });
  };

  const cardItems = cardsData.map((card) => {
    return (
      <Card
        card={card}
        plusOneToCard={plusOneToCard}
        deleteOneCard={deleteOneCard}
      ></Card>
    );
  });

  return (
    <section className="cards-container">
      <section>
        <h2>Cards for {props.board.title}</h2>
        <div className="card-elements-container">{cardItems}</div>
      </section>
      <NewCardForm postNewCard={postNewCard}></NewCardForm>
    </section>
  );
};

export default CardsList;
