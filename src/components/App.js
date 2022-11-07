import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API = "http://localhost:3001/toys"

function App() {
  const [toys, setToys] = useState("")
  const [showForm, setShowForm] = useState(false);

  useEffect(() =>{
    fetch(API)
    .then(response => response.json())
    .then(toyData => setToys(toyData))
  },[])

  function handleClick() {
    setShowForm((showForm) => !showForm);
   
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
