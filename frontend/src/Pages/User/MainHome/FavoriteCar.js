import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Notif from "../../Toast";

function FavoriteCar({ carId }) {
  const [favorite, setFavorite] = useState({});
  const [fresh, setFresh] = useState(false);
  const token = localStorage.getItem('token');
  const headers = ({
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/favorite/myfavorite-cars/${carId}`, { headers })
      .then((response) => {
        setFavorite(response.data.favoriteCars);
      })
      .catch((error) => {
        console.error('Error fetching favorite:', error);
      });
  }, [fresh]);


  function handleFavorite() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    axios.get(`http://localhost:4000/favorite/myfavorite-cars/${carId}`, { headers })
      .then((response) => {
        if (response.data.favoriteCars) {
          axios.delete(`http://localhost:4000/favorite/delete-from-favorites/${carId}`, { headers })
            .then((deleteResponse) =>  {
              Notif.warning("The car has been removed from your bookmarks");
              setFresh(!fresh);
            })
            .catch((deleteError) => Notif.error("There was an issue while removing the car from your bookmarks. Please try again"));
        } else {
          axios.post(`http://localhost:4000/favorite/add-to-favorites/${carId}`, {}, { headers })
            .then((addResponse) => {
              Notif.success("The car has been added to your bookmarks");
              setFresh(!fresh);
          })
            .catch((addError) => Notif.error("here was an issue while adding the car to your bookmarks. Please try again"));
        }
      })
      .catch((error) => Notif.error("There was an issue while this action. Please try again"));
  }
  

  return (
    <a onClick={handleFavorite} className="mx-1">
      {favorite ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2A2C41" className="two-icons">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2A2C41" className="two-icons">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
        </svg>
      )}
    </a>
  );
}

export default FavoriteCar;