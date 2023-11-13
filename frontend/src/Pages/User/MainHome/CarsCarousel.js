import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FavoriteCar from '../MainHome/FavoriteCar';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import Notif from '../../Toast';

function CarsCarousel() {
  const [allCars, setAllCars] = useState([]);
  const [fresh, setFresh] = useState(false);

  const userId = localStorage.getItem("userId");  
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    // Get all cars :
    axios.get('http://localhost:4000/cars', { headers })
      .then((response) => {
        setAllCars(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, [fresh]);

  const handleConfirm = (carId) => {
    confirmAlert({
      overlayClassName: 'custom-overlay',
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui text-inter bg-spyellow text-spdark rounded-3'>
            <p className='h5 fw-bolder pt-2'>Confirmation</p>
            <hr className='text-spdark my-0'/>
            <p className='p-3'>Are you sure you want to update this car?</p>
            <div className='row'>
              <div className='col-6'></div>
              <div className='col-6 d-flex justify-content-end'>
                <button className='btn btn-success' onClick={() => {
                    handleDelete(carId)
                    onClose()
                }}>Yes</button>
                <button className='btn btn-danger mx-2' onClick={onClose}>No</button>
              </div>
            </div>
          </div>
        )
      }
    })
  };

  const handleDelete = (carId) => {
    axios.delete(`http://localhost:4000/cars/delete-car/${carId}/`, { headers })
      .then((response) => {
        Notif.success("This car has been deleted successfully");
        setFresh(!fresh);
      })
      .catch((error) => {
        Notif.error("There was an error while deleting this car. Please try again");
      });
  }

  return (
    <section id="CarsCarousel" className="container-fluid mb-5">
      <div className="text-spyellow text-center py-3">
        <p className="text-chiaroscura display-5 my-0">Our Unique Collection</p>
        <p className="text-chiaroscura h4">Of Classic Cars</p>
      </div>
      <div className="row">

      {
        allCars.map((car) => (
          <div key={car.id} className="col-md-6 col-sm-6 p-2">
            <div className="div-card-car h-auto w-auto">
              <img src={`http://localhost:4000/uploads/cars/${car.img}`} className="img-card-car img-fluid" alt={`Car ${car.model}`} />
            </div>
            <div className="bg-spyellow text-spdark text-center p-3">
              <h2 className="text-chiaroscura display-6 fw-bolder">{car.model.length > 25 ? `${car.model.slice(0, 25)}...` : car.model}</h2>
              <p className="text-inter lead">{car.brand.length > 25 ? `${car.brand.slice(0, 25)}...` : car.brand}</p>
              <div className="row">
                <div className="col-6 fw-bolder h4 d-flex justify-content-start">{car.year}</div>
                <div className="col-6 d-flex justify-content-end">

                  <FavoriteCar carId={car.id} />

                  {parseInt(userId) === car.userId ? (<Link to={`/update-car/${car.id}`} className="mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2A2C41" className="two-icons">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </Link>):""}

                  {parseInt(userId) === car.userId ? (<a onClick={() => handleConfirm(car.id)} className="mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2A2C41" className="two-icons">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </a>):""}

                </div>
              </div>
            </div>
          </div>
        ))
      }

      </div>
    </section>
  );
}

export default CarsCarousel;
