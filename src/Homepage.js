import React, { useState, useEffect } from "react";
import './App.css';
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ListHome from "./components/ListHome";
import Modal from "./components/Modal";
import data from "./notes";

export default function Homepage() {
  
    // extra
    let listItem = data;
    const storageTodos = getStorage();
    if(storageTodos===null){
        updateStorage(JSON.stringify(listItem));
    }else{
        listItem = getStorage();
    } 
    //etra

    const [notes] = useState(listItem);

    useEffect(() => {
        updateStorage(JSON.stringify(notes));
    },[notes]);

    function getStorage() {
        return JSON.parse(localStorage.getItem('list'));
    }

    function updateStorage(newList){
        localStorage.setItem('list', newList);
    }

    const showModal = (title, content, image, price) => {
      document.getElementsByClassName("info")[0].classList.remove("hide");
      document.querySelector('body').classList.add('no-scroll');
      document.querySelectorAll('.super-title')[0].innerHTML = title;
      document.querySelectorAll('.super-desc')[0].innerHTML = content;
      document.querySelectorAll('.super-cover')[0].src = image;
      document.querySelectorAll('.super-cover')[1].src = image;
      document.querySelectorAll('.super-cover')[2].src = image;
      document.querySelectorAll('.super-cover')[3].src = image;
      document.querySelectorAll('.super-cover')[4].src = image;
      document.querySelectorAll('.super-price')[0].innerHTML = price;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
    

return (
  <div className="App pb-5 home">
    <Header />
    
    <Hero />
    {/* Notes list */}
    <div className="container mt-3">
      <div className="col-12 row m-0 p-0">
        <hr />
        {notes.map((noteItem, index) => {
          return (
            <ListHome
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              image={noteItem.image}
              price={noteItem.price}
              showModal={showModal}
            />
          );
        })}
      </div>
    </div>
    {/* Notes list */}
    <Footer />
    <Modal />
  </div>
  );
}