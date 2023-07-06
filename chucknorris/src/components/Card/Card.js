import React from 'react';
import { useEffect, useState } from 'react';
import './Card.css';
import Modal from '../Modal/Modal';

const Card = ({categories}) => {
  const [jokes, setJokes] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const closeModal = () => {
    setIsModalVisible(false);
  }

  const refreshJoke = (key) => async () => {
    setSelectedCategoryIndex(key);
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${categories[key]}`);
    const jokeData = await response.json();

    setJokes((prevJokes) => ({
        ...prevJokes,
        [key]: jokeData,
    }));

    setIsModalVisible(true);
  }

  useEffect(() => {
    const fetchJokes = async () => {
      const categoryKeys = Object.keys(categories);
      const jokePromises = categoryKeys.map((key) =>
        fetch(`https://api.chucknorris.io/jokes/random?category=${categories[key]}`)
          .then((response) => response.json())
      );
      
      const jokesData = await Promise.all(jokePromises);
      const jokesObject = categoryKeys.reduce((acc, key, index) => {
        acc[key] = jokesData[index];
        return acc;
      }, {});
      
      setJokes(jokesObject);
    };

    fetchJokes();
  }, [categories]);

  return (
    <div className="card-container">
      <div className="grid-container">
        {Object.keys(jokes).map((key, index) => (
          <div className="card" key={key} onClick={refreshJoke(key)}>
            <h2 className="card-title">{categories[key]}</h2>
            <p className="card-text">Unlimited jokes on {categories[key]}</p>
          </div>
        ))}
        <Modal 
            isModalVisible={isModalVisible} 
            closeModal={closeModal} 
            jokes = {jokes}
            selectedCategoryIndex = {selectedCategoryIndex}
            refreshJoke = {refreshJoke}
        />
      </div>
    </div>
  );
};

export default Card;