import React from "react";

function ToyCard({toy, handleDelete, handleClickLikes}) {
  // passing toy object and passing props
  const {name, image, likes, id} = toy;
  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button onClick={()=> handleClickLikes(toy)}className="like-btn">Like {"<3"}</button>
      <button onClick={() => handleDelete(id)}className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
