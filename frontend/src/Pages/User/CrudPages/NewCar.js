import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import Navbar from "../../NavbarAndFooter/Navbar";
import Footer from "../../NavbarAndFooter/Footer";
import Notif from "../../Toast";

function NewCar(){
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(''); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: file });
    }
  };

  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    details:'',
    year: '',
    speed: '',
    image: null,
  });

  const { model, brand, details, year, speed, image } = formData;

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleConfirm = () => {
    Notif.warning("Car will awaiting admin review. It will be visible once approved");
    confirmAlert({
      overlayClassName: 'custom-overlay',
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui text-inter bg-spyellow text-spdark rounded-3'>
            <p className='h5 fw-bolder pt-2'>Confirmation</p>
            <hr className='text-spdark my-0'/>
            <p className='p-3'>Are you sure you want to add this car?</p>
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

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const carData = new FormData();
      carData.append('model', model);
      carData.append('brand', brand);
      carData.append('details', details);
      carData.append('year', year);
      carData.append('maxSpeed', speed);
      carData.append('img', image);

      axios.post('http://localhost:4000/cars/new-car', carData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      Notif.success("Car added successfully! Your new car listing is now pending admin approval");
      setTimeout(()=>{navigate("/home")}, 3000);
    } catch (err) {
      Notif.error("Error adding Car: Please check your input and try again");
    }
  };

  return(
    <section>
      <Navbar/>
      <div className="col-md-4 col-sm-4 mx-auto p-1 mb-5">
        <div className="text-center m-0 mt-4">
          <p className="h2 text-chiaroscura text-spyellow m-0">Add a classic elegance</p>
          <p className="text-spyellow m-0">to our collection</p>
        </div>
        <div className="div-card-newcar h-auto w-auto">
          <img src={imagePreview} className="img-card-car img-fluid" alt="" />
        </div>
        <div className="bg-spyellow text-spdark p-3">

          <div className="signUp-form">
            <div className="form-group mb-2">
              <label className="label text-spdark" htmlFor="model">Model</label>
              <input type="text" className="form-control" placeholder="Model" name="model" value={model} onChange={handleChange} required/>
            </div>
            <div className="form-group mb-2">
              <label className="label text-spdark" htmlFor="brand">Brand</label>
              <input type="text" className="form-control" placeholder="Brand" name="brand" value={brand} onChange={handleChange} required/>
            </div>
            <div className="form-group mb-2">
              <label className="label text-spdark" htmlFor="details">Details</label>
              <textarea rows={3} className="form-control" placeholder="Details" name="details" value={details} onChange={handleChange} required></textarea>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-6 pl-0 pr-1">
                  <div className="form-group mb-2">
                    <label className="label text-spdark" htmlFor="year">Year</label>
                    <input type="number" className="form-control" placeholder="Year" name="year" value={year} onChange={handleChange} required/>
                  </div>
                </div>
                <div className="col-6 pr-0 pl-1">
                  <div className="form-group mb-2">
                    <label className="label text-spdark" htmlFor="speed">Speed</label>
                    <input type="number" className="form-control" placeholder="Speed" name="speed" value={speed} onChange={handleChange} required/>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label className="label text-spdark" htmlFor="image">Image</label>
              <input type="file" className="form-control" placeholder="Image" name="image" onChange={handleImageChange} accept="image/png" required/>
            </div>
            <div className="form-group">
              <button type="submit" onClick={handleConfirm} className="form-control btn btn-spdark rounded submit px-3">Submit</button>
            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
}

export default NewCar;