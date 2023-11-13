import React, {useState, useEffect} from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

function Charts() {
  const [dataCars, setDataCars] = useState([]);
  const [dataOpinions, setDataOpinions] = useState([]);
  const [dataSignin, setDataSignin] = useState([]);
  const [dataSignup, setDataSignup] = useState([]);

  const [fresh, setFresh] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(()=>{
    // Data doughnut :
    axios.get('http://localhost:4000/admin/data-doughnut', { headers })
      .then((response) => {
        setDataCars(response.data.dataCars);
        setDataOpinions(response.data.dataOpinions);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });

    // Data sign in :
    axios.post('http://localhost:4000/admin/datacharts/signin', {year: "2023"}, { headers })
      .then((response) => {
        setDataSignin(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });

    // Data sign up :
    axios.post('http://localhost:4000/admin/datacharts/signup', {year: "2023"}, { headers })
      .then((response) => {
        setDataSignup(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, [fresh]);

  const options = {
    scales: {
      x: {
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        beginAtZero: true, 
        stepSize: 1, 
        scaleLabel: {
          display: true,
          labelString: "Sign Up Count",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  const doughnutOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true, 
        },
      },
    },
  };

  const mapMonth = (monthNumber) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthNumber - 1]; 
  }
  

  const signinData = {
    labels: dataSignin.map((data) => {
      const [month, year] = data._id.split('-');
      return `${mapMonth(parseInt(month))}`;
    }),
    datasets: [
      {
        label: " Users",
        data: dataSignin.map((data) => data.count),
        backgroundColor: "#FDBF50",
        borderColor: "#FDBF50",
        borderWidth: 2,
      },
    ],
  };

  const signupData = {
    labels: dataSignup.map((data) => {
      const [month, year] = data._id.split('-');
      return `${mapMonth(parseInt(month))}`;
    }),
    datasets: [
      {
        label: " Users",
        data: dataSignup.map((data) => data.count),
        backgroundColor: "#FDBF50",
        borderColor: "#FDBF50",
        borderWidth: 2,
      },
    ],
  };


  const carsData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        data: [dataCars.pendingCars, dataCars.approvedCars, dataCars.rejectedCars],
        backgroundColor: ["#f0ad4e", "#5cb85c", "#d9534f"],
      },
    ],
  };


  const opinionsData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        data: [dataOpinions.pendingOpinions, dataOpinions.approvedOpinions, dataOpinions.rejectedOpinions],
        backgroundColor: ["#f0ad4e", "#5cb85c", "#d9534f"],
      },
    ],
  };

  return (
    <section>
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-xl-6 col-lg-12">
          <div className="shadow p-3 bg-light rounded" id="chartMobile">
            <p className="h5 text-spdark">Sign up stats this year</p>
            <Line data={signupData} options={options} />
          </div>
        </div>
        <div className="col-md-6 col-xl-6 col-lg-12">
          <div className="shadow p-3 bg-light rounded">            
            <p className="h5 text-spdark">Sign in stats this year</p>
            <Line data={signinData} options={options} />
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-3 col-xl-3 col-lg-6">
          <div className="shadow p-3 bg-light rounded" id="chartMobile">
            <p className="h5 text-spdark">Collection stats</p>
            <Doughnut data={carsData} options={doughnutOptions} />
          </div>
        </div>
        <div className="col-md-3 col-xl-3 col-lg-6">
          <div className="shadow p-3 bg-light rounded">
            <p className="h5 text-spdark">Clients opinions stats</p>
            <Doughnut data={opinionsData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default Charts;

