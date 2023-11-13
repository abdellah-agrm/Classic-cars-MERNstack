import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import Navbar from "../../NavbarAndFooter/Navbar";
import Footer from "../../NavbarAndFooter/Footer";
import Notif from "../../Toast"; 

function UpdateCar() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams();
  const [carData, setCarData] = useState({
    model: "",
    brand: "",
    details: "",
    year: "",
    maxSpeed: "",
    img: null
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios.get(`http://localhost:4000/cars/get-car/${id}`, { headers })
    .then((response) => {
      console.log(response)
      const car = response.data.data;
      setCarData({
        model: car.model,
        brand: car.brand,
        details: car.details,
        year: car.year,
        maxSpeed: car.maxSpeed,
        img: null,
      });
      setImagePreview(`http://localhost:4000/uploads/cars/${car.img}`);
      setImageFile(car.img);
    })
    .catch((error) => {
      console.error("Error fetching car data:", error);
      navigate("/notfound")
    });
  }, [id]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setCarData({ ...carData, img: file }); 
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
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
                    handleSubmit()
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const carUpdate = new FormData();
      carUpdate.append("model", carData.model);
      carUpdate.append("brand", carData.brand);
      carUpdate.append("details", carData.details);
      carUpdate.append("year", carData.year);
      carUpdate.append("maxSpeed", carData.maxSpeed);

      if (imageFile) {
        carUpdate.append("img", imageFile);
      }

      axios.put(`http://localhost:4000/cars/update-car/${id}`, carUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => Notif.success("Car updated Successfully"))
      .catch((error) => Notif.error("Error updating Car: Please check your input and try again"));
    } catch (err) {
      Notif.error("Error updating Car: Please check your input and try again");
    }
    console.log(carData);
  };

  return (
    <section>
      <Navbar />
      <div className="col-md-4 col-sm-4 mx-auto p-1 mb-5">
      <div className="text-center m-0 mt-4">
          <p className="h2 text-chiaroscura text-spyellow m-0">Modify one of classic car</p>
          <p className="text-spyellow m-0">from our collection</p>
        </div>
        <div className="div-card-newcar h-auto w-auto">
          <img src={imagePreview} className="img-card-car img-fluid" alt="" />
        </div>
        <div className="bg-spyellow text-spdark p-3">
          <div className="updateCar-form">
            <div className="form-group mb-2">
              <label className="label text-spdark" htmlFor="model">
                Model
              </label>
              <input type="text" className="form-control" id="model" name="model" placeholder="Model" value={carData.model} onChange={handleChange} required />
            </div>
            <div className="form-group mb-2">
              <label className="label text-spdark" htmlFor="brand">
                Brand
              </label>
              <input type="text" className="form-control" id="brand" name="brand" placeholder="Brand" value={carData.brand} onChange={handleChange} required />
            </div>
            <div className="form-group mb-2">
              <label className="label text-spdark" htmlFor="details">
                Details
              </label>
              <textarea className="form-control" id="details" name="details" rows="3" placeholder="Details" value={carData.details} onChange={handleChange} required></textarea>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-6 pl-0 pr-1">
                  <div className="form-group mb-2">
                    <label className="label text-spdark" htmlFor="year">
                      Year
                    </label>
                    <input type="number" className="form-control" id="year" name="year" placeholder="Year" value={carData.year} onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-6 pr-0 pl-1">
                  <div className="form-group mb-2">
                    <label className="label text-spdark" htmlFor="maxSpeed">
                      Max Speed
                    </label>
                    <input type="number" className="form-control" id="maxSpeed" name="maxSpeed" placeholder="Max Speed" value={carData.maxSpeed} onChange={handleChange} required />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label className="label text-spdark" htmlFor="img">
                Image
              </label>
              <input type="file" className="form-control" id="img" name="img" onChange={handleImageChange} accept="image/png"  />
            </div>
            <div className="form-group">
              <button type="submit" onClick={handleConfirm} className="form-control btn btn-spdark rounded submit px-3">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default UpdateCar;
