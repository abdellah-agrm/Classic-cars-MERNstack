import React, {useState, useEffect} from 'react';
import { Quote, ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import axios from 'axios';

const ClientsOpinion = () => {
  const [opinions, setOpinions] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(()=>{
    axios.get("http://localhost:4000/message/all-opinions", {headers})
    .then((res)=>{
      setOpinions(res.data.data);
    })
    .catch((error)=>{
      console.error("user information : ",error);
    });
  },[]);

  const groupOpns = [];

  // Split the opinions into one op of 2
  for (let i = 0; i < opinions.length; i += 2) {
    groupOpns.push(opinions.slice(i, i + 2));
  }

  return (
    <section id="ClientsOpinion" className='mb-4 pt-5'>
      <div className="text-spyellow text-center">
        <p className="text-chiaroscura display-5 my-0">What Say Our Clients</p>
        <p className="text-inter h4">Testimonial</p>
      </div>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner co-carousel">
          {groupOpns.map((OneOp, index) => (
            <div key={index} className={`container-fluid carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row text-center px-lg-5">
                {OneOp.map((op, opIndex) => (
                  <div key={opIndex} className="col-lg-4 mx-auto col-md-6">
                    <img className="rounded-circle shadow-1-strong mb-4" src={op.photoMsg !== 'null' ?`http://localhost:4000/uploads/profiles/${op.photoMsg}`:"/elements-img/profile-img.jpg"} alt={op.usernameMsg} style={{ width: "150px", border: "1.5px solid #FDBF50" }}/>
                    <h5 className="mb-3 text-spyellow fw-bolder text-chiaroscura">{op.usernameMsg}</h5>
                    <p className="text-inter text-spwhite">
                      <Quote className="" width={25} height={25}/>
                      {op.textMsg}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="row">
            <div className="text-center">
              <ArrowLeftCircleFill className="co-arrows mr-1 text-spyellow rounded-circle" width={35} height={35} data-bs-target="#carouselExample" data-bs-slide="prev" />
              <ArrowRightCircleFill className="co-arrows ml-1 text-spyellow rounded-circle" width={35} height={35} data-bs-target="#carouselExample" data-bs-slide="next" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsOpinion;
