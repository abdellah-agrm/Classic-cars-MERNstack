import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import axios from "axios";

import Navbar from "../../NavbarAndFooter/Navbar";
import Footer from "../../NavbarAndFooter/Footer";

import Notif from "../../Toast";

function YourOpinion() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=> {
    setUsername(localStorage.getItem("userName"));
  },[]);

  const handleConfirm = () => {
    confirmAlert({
      overlayClassName: 'custom-overlay',
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui text-inter bg-spyellow text-spdark rounded-3'>
            <p className='h5 fw-bolder pt-2'>Confirmation</p>
            <hr className='text-spdark my-0'/>
            <p className='p-3'>Are you sure you want to share your opinion?</p>
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

  const handleSubmit = () => {
    const photoMsg = localStorage.getItem("photo");
    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    const formData = {
      usernameMsg: username,
      textMsg: message,
      photoMsg: photoMsg
    };

    axios.post('http://localhost:4000/message/opinion', formData, { headers })
      .then((response) => {
        Notif.success("Thank you for sharing your opinion. It has been added successfully");
        setTimeout(()=>{navigate("/home")}, 2000);
      })
      .catch((error) => {
        Notif.error("There was an issue while submitting your opinion. Please try again");
      });
  }

  return(
    <section className="d-flex flex-column min-vh-100">
      <Navbar/>
      <div className="col-md-6 col-sm-4 mx-auto p-1 mt-2 mb-5">
        <div className="text-center m-0 mt-4 mb-3">
          <p className="h2 text-chiaroscura text-spyellow m-0">Testimonials</p>
          <p className="text-spyellow text-inter m-0">Share your experience</p>
        </div>
        <div className="bg-spyellow text-spdark p-3">

          <div className="signUp-form">
            <div className="form-group mb-2">
              <label className="label text-spdark" htmlFor="username">Username</label>
              <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} disabled/>
            </div>
            <div className="form-group mb-2">
              <label className="label text-spdark" htmlFor="message">Your Opinion</label>
              <textarea rows={3} className="form-control" placeholder="Your opinion" name="message" value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
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

export default YourOpinion;