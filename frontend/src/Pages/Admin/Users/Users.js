import { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from 'luxon';
import { PersonDash, PersonCheck, XCircle } from "react-bootstrap-icons";
import { Tooltip } from "react-tooltip";

function Users(){
  const [allUsers, setAllUsers] = useState([]);
  const [fresh, setFresh] = useState(false);
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(()=>{
    axios.get('http://localhost:4000/admin/users', { headers })
      .then((response) => {
        setAllUsers(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, [fresh]);

  const handleBlock = (user_id, userblock) => {
    const block = {"block": !userblock}
    axios.put(`http://localhost:4000/admin/block-user/${user_id}`, block, {headers})
      .then((req)=>{
        setFresh(!fresh);
        console.log(req.data);
      })
      .catch((err)=>console.log(err));
  }

  const handleDelete = (user_id) => {
    axios.delete(`http://localhost:4000/admin/delete-user/${user_id}`, {headers})
      .then((req)=>{
        console.log(req.data);
        setFresh(!fresh);
      })
      .catch((err)=>console.log(err))
  }

  const filteredUsers = allUsers.filter((user) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Unblock") {
      return !user.block;
    } else if (filter === "Block") {
      return user.block;
    }
    return false;
  });

  return (
    <section className="pb-4">
      <div className="w-auto shadow rounded-pill mb-3 p-2" style={{background: '#ffff'}}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="h4 text-spdark mb-0 ml-1 d-none d-md-block d-xl-block">Users management</p>
          <div>
            <a href="#" className={`filterdata ${filter === "All" ? "active" : ""} rounded-pill`} onClick={() => setFilter("All")}>All</a>
            <a href="#" className={`filterdata ${filter === "Unblock" ? "active" : ""} rounded-pill`} onClick={() => setFilter("Unblock")}>Unblock</a>
            <a href="#" className={`filterdata ${filter === "Block" ? "active" : ""} rounded-pill`} onClick={() => setFilter("Block")}>Block</a>
          </div>
        </div>
      </div>
      <div className="table-responsive p-2 rounded shadow" style={{background: "#ffff"}}>
        <table className="table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Registration date</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredUsers.map((user, index)=> (
                <tr key={index}>
                  <td>
                    <img className="rounded-circle border-spdark" src={`http://localhost:4000/uploads/profiles/${user.photo}`} alt={user.username} style={{height: '45px', width: '45px'}} data-tooltip-id={`user-photo-${index}`}/>
                    <Tooltip id={`user-photo-${index}`} place='right' style={{background: '#ffff'}}>
                      <img src={`http://localhost:4000/uploads/profiles/${user.photo}`} width="150px" height="auto"/>
                    </Tooltip>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className={`text-${user.block === false ? 'success' : 'danger'}`}>{user.block === false ? "Active" : "Block"}</td>
                  <td>{DateTime.fromISO(user.registrationDate).toFormat('dd-mm-yyyy')}</td>
                  <td>
                    {user.block === false?
                      (<a className="text-danger mx-1" href='#' data-tooltip-id="my-tooltip" data-tooltip-content="Block" onClick={()=>handleBlock(user.id, user.block)}>
                      <PersonDash className="icon-opinion" width={25} height={25} /></a>)
                      :(<a className="text-success mx-1" href='#' data-tooltip-id="my-tooltip" data-tooltip-content="Unblock" onClick={()=>handleBlock(user.id, user.block)}>
                      <PersonCheck className="icon-opinion" width={25} height={25} /></a>)
                    }
                  </td>
                  <td>
                    <a className="text-danger mx-1" href='#' data-tooltip-id="my-tooltip" data-tooltip-content="Delete" onClick={()=>handleDelete(user.id)}>
                    <XCircle className="icon-opinion" width={25} height={25} /></a>
                  </td>
                  <Tooltip id="my-tooltip" className='border border-muted text-dark' style={{background: '#ffff'}}/>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
  
}

export default Users;