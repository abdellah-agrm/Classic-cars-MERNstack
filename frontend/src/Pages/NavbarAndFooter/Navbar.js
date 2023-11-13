import React from "react";
import { ArrowDownCircle, Bookmark, BoxArrowRight, Person, BoxSeam, Envelope, ChatLeftQuote } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('userName');
  const photo = localStorage.getItem('photo');

  const handleConfirm = () => {
    confirmAlert({
      overlayClassName: 'custom-overlay',
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui text-inter bg-spyellow text-spdark rounded-3'>
            <p className='h5 fw-bolder pt-2'>Confirmation</p>
            <hr className='text-spdark my-0'/>
            <p className='p-3'>Are you sure you want to sign out?</p>
            <div className='row'>
              <div className='col-6'></div>
              <div className='col-6 d-flex justify-content-end'>
                <button className='btn btn-success' onClick={() => {
                    handleSignOut()
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

  const handleSignOut = () => {
    localStorage.clear('token');
    localStorage.clear('userId');
    localStorage.clear('userName');
    navigate("/sign-in");
  }

  return (
    <header className="mx-4 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/home" className="nav-link px-2 text-spyellow">Home</a></li>
        <li><a href="/home#CarsCarousel" className="nav-link px-2 text-spyellow">Collection</a></li>
        <li><a href="/home#ClientsOpinion" className="nav-link px-2 text-spyellow">Testimonial</a></li>
        <li><a href="/home#FAQs" className="nav-link px-2 text-spyellow">FAQs</a></li>
      </ul>

      <div>
        <span className="badge d-flex align-items-center p-1 pe-2 text-spyellow text-capitalize bg-spdark float-end border-spyellow rounded-pill" data-bs-toggle="dropdown" aria-expanded="false">
          <img className="rounded-circle me-1" width="35" height="35" src={photo === 'null' ?"":`http://localhost:4000/uploads/profiles/${photo}`} alt="" />
          {username}
          <span className="vr mx-2"></span>
          <span className="arrow-down">
            <ArrowDownCircle width={20} height={20} fill="#FDBF50" />
          </span>
        </span>
        <ul className="dropdown-menu mx-auto mr-4">
          <li><a className="dropdown-item py-2 d-flex items-content-center" href="/account/profile"><Person style={{ alignSelf: 'flex-center', paddingTop: '2px', marginRight: '4px', width: 'auto', height: '20px' }}/>Profile</a></li>
          <li><a className="dropdown-item py-2 d-flex items-content-center" href="/account/bookmarks"><Bookmark style={{ alignSelf: 'flex-center', paddingTop: '4px', marginRight: '4px' }} height={20}/> Bookmarks</a></li>
          <li><a className="dropdown-item py-2 d-flex items-content-center" href="/account/my-collection"><BoxSeam style={{ alignSelf: 'flex-center', paddingTop: '4px', marginRight: '4px' }} height={20}/> My collection</a></li>
          <li><a className="dropdown-item py-2 d-flex items-content-center" href="/account/your-opinion"><ChatLeftQuote style={{ alignSelf: 'flex-center', paddingTop: '4px', marginRight: '4px' }} height={20}/> Your opinion</a></li>
          <li><a className="dropdown-item py-2 d-flex items-content-center" href="/account/contact"><Envelope style={{ alignSelf: 'flex-center', paddingTop: '4px', marginRight: '4px' }} height={20}/> Contact us</a></li>
          <li><a className="dropdown-item py-2 d-flex items-content-center" onClick={handleConfirm} href="#"><BoxArrowRight style={{ alignSelf: 'flex-center', paddingTop: '4px', marginRight: '4px' }} height={20}/> Sign out</a></li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
