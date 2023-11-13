import { useState, useEffect } from 'react';
import axios from "axios";
import { DateTime } from 'luxon';
import { Tooltip } from 'react-tooltip';
import { ClockHistory, XCircle, CheckCircle } from "react-bootstrap-icons";

function Collection(){
  const [allCars, setAllCars] = useState([]);
  const [fresh, setFresh] = useState(false);
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(()=>{
    axios.get('http://localhost:4000/admin/admin-cars', { headers })
      .then((response) => {
        setAllCars(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, [fresh]);

  const handleDelete = (car_id) => {
    axios.delete(`http://localhost:4000/cars/delete-car/${car_id}`, {headers})
      .then((req)=>{
        console.log(req.data);
        setFresh(!fresh);
      })
      .catch((err)=>console.log(err))
  }

  const filteredCars = allCars.filter((car) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Pending" && car.status === "pending") {
      return true;
    } else if (filter === "Approved" && car.status === "approved") {
      return true;
    } else if (filter === "Rejected" && car.status === "rejected") {
      return true;
    }
    return false;
  });
  
  function handleStatus(carId, status) {
    axios.put(`http://localhost:4000/admin/status-cars/${carId}`, { status }, { headers })
      .then((response) => {
        setFresh(!fresh);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="h-auto pb-5">
      <div className="w-auto shadow rounded-pill mb-3 p-2" style={{background: '#ffff'}}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="h4 text-spdark mb-0 ml-1 d-none d-md-block d-xl-block">Cars management</p>
          <div>
            <a href="#" className={`filterdata ${filter === "All" ? "active" : ""} rounded-pill`} onClick={()=>setFilter("All")}>All</a>
            <a href="#" className={`filterdata ${filter === "Pending" ? "active" : ""} rounded-pill`} onClick={()=>setFilter("Pending")}>Pending</a>
            <a href="#" className={`filterdata ${filter === "Approved" ? "active" : ""} rounded-pill`} onClick={()=>setFilter("Approved")}>Approved</a>
            <a href="#" className={`filterdata ${filter === "Rejected" ? "active" : ""} rounded-pill`} onClick={()=>setFilter("Rejected")}>Rejected</a>
          </div>
        </div>
      </div>
      <div className="table-responsive p-2 rounded shadow" style={{background: "#ffff"}}>
        <table className="table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Model</th>
              <th>Year</th>
              <th>Speed</th>
              <th>Details</th>
              <th>User</th>
              <th>Creation date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredCars.map((car, index)=> (
                <tr key={index}>
                  <td>
                    <img src={`http://localhost:4000/uploads/cars/${car.img}`} alt={car.model} style={{height: 'auto', width: '60px'}} data-tooltip-id={`car-img-${index}`}/>
                    <Tooltip id={`car-img-${index}`} place='right' style={{background: '#ffff'}}>
                      <img src={`http://localhost:4000/uploads/cars/${car.img}`} width="400px" height="auto"/>
                    </Tooltip>
                  </td>
                  <td>{car.model.length > 25 ? `${car.model.slice(0, 25)}...` : car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.maxSpeed}</td>
                  <td>
                    <a data-tooltip-id={`details-${index}`}>{car.details.length > 25 ? `${car.details.slice(0, 25)}...` : car.details}</a>
                    <Tooltip id={`details-${index}`} place='bottom' style={{background: 'none'}}>
                      <div style={{width: '400px'}}>
                        <div className='card'>
                          <div className='card-body'>
                            {car.details}
                          </div>
                        </div>
                      </div>
                    </Tooltip>
                  </td>
                  <td>{car.userId}</td>
                  <td>{DateTime.fromISO(car.creationDate).toFormat('dd-mm-yyyy')}</td>
                  <td className={`text-${car.status === 'approved' ? 'success' : car.status === 'pending' ? 'warning' : 'danger'}`}>{car.status}</td>
                  <td>
                    <a className="text-success mx-1" href='#' data-tooltip-id="my-tooltip" data-tooltip-content="approved" onClick={()=>handleStatus(car.id, 'approved')}>
                      <CheckCircle className="icon-opinion" width={25} height={25} /></a>
                    <a className="text-warning mx-1" href='#' data-tooltip-id="my-tooltip" data-tooltip-content="pending" onClick={()=>handleStatus(car.id, 'pending')}>
                      <ClockHistory className="icon-opinion" width={25} height={25} /></a>
                    <a className="text-danger mx-1" href='#' data-tooltip-id="my-tooltip" data-tooltip-content="rejected" onClick={()=>handleStatus(car.id, 'rejected')}>
                      <XCircle className="icon-opinion" width={25} height={25} /></a>
                    <Tooltip id="my-tooltip" className='border border-muted text-dark' style={{background: '#ffff'}}/>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
  
}

export default Collection;