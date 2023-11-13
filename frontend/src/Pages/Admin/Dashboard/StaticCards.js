import React, {useState, useEffect} from 'react';
import CountUp from 'react-countup';
import axios from 'axios';
import { PersonCircle, BoxSeam, ChatSquareQuote, Envelope } from "react-bootstrap-icons";

const StaticCards = () => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [cardsStats, setCardsStats] = useState({});

  useEffect(()=>{
    // Data cards stats :
    axios.get('http://localhost:4000/admin/cardsstats', { headers })
      .then((response) => {
        setCardsStats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  },[])
  return (
    <div className="container">
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"></link>
      <div className="row">
        
        <div className="col-6 col-md-4 col-xl-3">
          <div className="cardstats shadow bg-c-blue order-card">
            <div className="card-block">
              <h5 className="m-b-20">Users</h5>
              <h2 className="text-right">
                <PersonCircle className="f-left"/><CountUp start={0} end={cardsStats.users} duration={3}/>
              </h2>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-4 col-xl-3">
          <div className="cardstats shadow bg-c-green order-card">
            <div className="card-block">
              <h5 className="m-b-20">Collection</h5>
              <h2 className="text-right">
                <BoxSeam className="f-left"/><CountUp start={0} end={cardsStats.collection} duration={3}/>
              </h2>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-4 col-xl-3">
          <div className="cardstats shadow bg-c-yellow order-card">
            <div className="card-block">
              <h5 className="m-b-20">Opinions</h5>
              <h2 className="text-right">
                <ChatSquareQuote className="f-left"/><CountUp start={0} end={cardsStats.opinions} duration={3}/>
              </h2>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-4 col-xl-3">
          <div className="cardstats shadow bg-c-pink order-card">
            <div className="card-block">
              <h5 className="m-b-20">Reports</h5>
              <h2 className="text-right">
                <Envelope className="f-left"/><CountUp start={0} end={cardsStats.reports} duration={3}/>
              </h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaticCards;
