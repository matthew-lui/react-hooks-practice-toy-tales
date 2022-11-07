import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API= "http://localhost:3001/toys"
const headers = {
  Accepts: "application/json",
        "Content-Type" : "application/json"
}
function App() {
  const [toys, setToys] = useState([])
  const [showForm, setShowForm] = useState(false);


  useEffect(() =>{
    fetch(API)
    .then(response => response.json())
    .then(toyData => setToys(toyData))
  },[])

  function handleClick() {
    setShowForm((showForm) => !showForm);
   
  }


  function addToy(toy){
    fetch(API, {
      method: "POST",
      body: JSON.stringify(toy),
      headers,
    })
    .then((response)=> response.json())
    .then((json)=>setToys([...toys, json]));
    
  }

  // string that uses a ${variable} in it
  function deleteToy(id){
    console.log('deleting', id)
    // we are interpolating here because its on deliveraible that we need to set delete URL to locahost3000/toys/:id 
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers, 
      // the filter is needed because when the toy is deleted, it updates state on page so it deletes the card too. The request still works withoutfilter but it only reflects in the json file.
    }).then(()=>setToys(toys.filter(toy => toy.id !== id)))
    // if you're getting this into a form, you might need to convert number to a string.
    // setting a toy to a filter listed of toys. we are only showing a toy id is not equal to the id we just got
  }

  function incrementLikes(toy){
    console.log("increment", toy.id)
    fetch(`${API}/${toy.id}`, {
      method: "PATCH",
      headers, 
      body: JSON.stringify({likes: toy.likes +1}),
    }).then(() => 
      setToys(
        toys.map( theToy=> theToy.id !== toy.id ? theToy : {...theToy, likes: theToy.likes +1 } 
      )
    )
   )
  }

  useEffect(()=> {
    fetch(API)
    .then(response => response.json())
    .then(json => setToys(json))
  }, []);
  return (
    <>
      <Header />
      {showForm ? <ToyForm handleSubmit={addToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={deleteToy} handleClickLikes={incrementLikes}/>
    </>
  );
}

export default App;
