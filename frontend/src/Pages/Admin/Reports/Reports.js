import { useState, useEffect } from 'react';
import axios from "axios";
import { Tooltip } from 'react-tooltip';
import { ClockHistory, XCircle, CheckCircle } from "react-bootstrap-icons";

function Reports(){
  const [allReports, setAllReports] = useState([]);
  const [fresh, setFresh] = useState(false);
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(()=>{
    axios.get('http://localhost:4000/admin/admin-reports', { headers })
      .then((response) => {
        setAllReports(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, [fresh]);

  function handleStatus(reportId, statusMsg) {
    axios.put(`http://localhost:4000/admin/status-report/${reportId}`, { statusMsg }, { headers })
      .then((response) => {
        console.log(response.data.data);
        setFresh(!fresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterReports = allReports.filter((op) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Pending" && op.statusMsg === "pending") {
      return true;
    } else if (filter === "Done" && op.statusMsg === "done") {
      return true;
    } else if (filter === "Rejected" && op.statusMsg === "rejected") {
      return true;
    }
    return false;
  });

  return(
    <section className="h-auto pb-4">
      <div className="w-auto shadow rounded-pill mb-3 p-2" style={{background: '#ffff'}}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="h4 text-spdark mb-0 ml-1 d-none d-md-block d-xl-block">Users reports</p>
          <div>
            <a href="#" className={`filterdata ${filter === "All" ? "active" : ""} rounded-pill`} onClick={()=>setFilter("All")}>All</a>
            <a href="#" className={`filterdata ${filter === "Pending" ? "active" : ""} rounded-pill`} onClick={()=>setFilter("Pending")}>Pending</a>
            <a href="#" className={`filterdata ${filter === "Done" ? "active" : ""} rounded-pill`} onClick={()=>setFilter("Done")}>Done</a>
            <a href="#" className={`filterdata ${filter === "Rejected" ? "active" : ""} rounded-pill`} onClick={()=>setFilter("Rejected")}>Rejected</a>
          </div>
        </div>
      </div>
      <div className="row">
        {filterReports.map((report, index)=> (
          <div key={index} className="col-12 col-xl-4 col-md-6">
            <div className={`shadow border-right border-${report.statusMsg === 'done' ? 'success' : report.statusMsg === 'pending' ? 'warning' : 'danger'} border-5 rounded py-2 px-3 my-2`} style={{background: '#ffff'}}>
            <div className="">
              <div className="row">
                <div className="col-2">
                  <img className="rounded-circle" width={45} height={45} src={`http://localhost:4000/uploads/profiles/${report.photoMsg}`} alt={report.usernameMsg} />
                </div>
                <div className="col-10 d-flex align-items-center">
                  <div>
                  <strong>{report.usernameMsg}</strong><br/>
                  <span>{report.emailMsg}</span>
                  </div>
                </div>
              </div>
              <p className="my-2" style={{height: '100px', overflowY: 'auto'}}>{report.textMsg}</p>
              <hr className="my-1"/>
              <div className="d-flex justify-content-between">
              <div><p className={`m-0 text-capitalize text-${report.statusMsg === 'done' ? 'success' : report.statusMsg === 'pending' ? 'warning' : 'danger'}`}>{report.statusMsg}</p></div>
                <div>
                  <a className="text-success mx-1" href='#' data-tooltip-id="my-tooltip" data-tooltip-content="done" onClick={()=>handleStatus(report.id, 'done')}>
                    <CheckCircle className="icon-opinion" width={25} height={25} /></a>
                  <a className="text-warning mx-1" href='#' data-tooltip-id="my-tooltip" data-tooltip-content="pending" onClick={()=>handleStatus(report.id, 'pending')}>
                    <ClockHistory className="icon-opinion" width={25} height={25} /></a>
                  <a className="text-danger mx-1" href='#' data-tooltip-id="my-tooltip" data-tooltip-content="rejected" onClick={()=>handleStatus(report.id, 'rejected')}>
                    <XCircle className="icon-opinion" width={25} height={25} /></a>
                      <Tooltip id="my-tooltip" className='border border-muted text-dark' style={{background: '#ffff'}}/>
                </div>
              </div>
            </div>
            </div>
          </div>
        ))
        }
      </div>
    </section>
  )
}

export default Reports;