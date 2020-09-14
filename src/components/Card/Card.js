import React from 'react';

function Card({link, numberOfLikes, name, onCardClick}){
  const handleCardClick = () =>{
    onCardClick({link, name});
  }
  
  return(
    <div className="templateCard">
        <li className="card">
          <button className="card__trash"></button>
          <img src={link} alt="Место из названия" className="card__picture"  onClick={handleCardClick} />
          <div className="card__description">
            <h3 className="card__title">{name}</h3>
            <div className="card__likeContainer">
              <button className="card__like"></button>
              <span className="card__likeNumbers">{numberOfLikes}</span>
            </div>
          </div>
        </li>
      </div>
  )
}

export default Card;