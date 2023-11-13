import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MainCarousel() {
  const [allCars, setAllCars] = useState([]);
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    // Get all cars:
    axios.get('http://localhost:4000/cars', { headers })
      .then((response) => {
        setAllCars(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, [token]);

  return (
    <section className="main-carousel">
      <div id="carouselExampleFade" className="carousel slide">
        <div className="carousel-inner">
          {allCars.map((car, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={car.id}>
              <div className="row">
                <div className="col-md-6 px-5 d-flex align-items-center">
                  <div className="mx-auto px-md-4">
                    <h3 className="car-name">
                      {car.model.length > 22 ? `${car.model.slice(0, 22)}...` : car.model}
                    </h3>
                    <p className="car-mini-description">
                      {car.details.length > 120 ? `${car.details.slice(0, 120)}...` : car.details}
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <img src={`http://localhost:4000/uploads/cars/${car.img}`} className="img-hover d-block w-100 hover-zoom" alt={car.model}/>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Under menu: */}
        <div className="container-fluid bg-spyellow text-spdark p-3">
          <div className="row d-flex align-items-center">
            <div className="col-3 border-spdark-end text-center">
              <b>Year</b> <br />
              1960
            </div>
            <div className="col-3 border-spdark-end text-center">
              <b>Type</b> <br />
              Classic
            </div>
            <div className="col-3 border-spdark-end text-center">
              <b>Speed</b> <br />
              120 Km/Hr
            </div>
            <div className="col-3 d-flex justify-content-center">
              <span className="two-arrows p-2" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </span>
              <span className="two-arrows p-2" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                  fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
