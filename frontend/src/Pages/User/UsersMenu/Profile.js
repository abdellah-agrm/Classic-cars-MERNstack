import React, {useState, useEffect} from "react";
import axios from "axios";
import Navbar from "../../NavbarAndFooter/Navbar";
import Footer from "../../NavbarAndFooter/Footer";

import Notif from "../../Toast";

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [current, setCurrent] = useState({cusername:"", cemail:""});
  const [password, setPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [open, setOpen] = useState({ u:false, e: false });
  const [fresh, setFresh] = useState(false);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(()=>{
    axios.get("http://localhost:4000/user/info", {headers})
    .then((res)=>{
      setUsername(res.data.user.username);
      setEmail(res.data.user.email);
      setCurrent({cusername: res.data.user.username, cemail: res.data.user.email});
      setPhoto(res.data.user.photo);
    })
    .catch((error)=>{
      console.error("user information : ",error);
    });
  },[fresh]);

  const warning = () => {
    Notif.warning("It is strongly advised to use a square format for your profile picture to ensure seamless adaptation to various profiles");
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      axios.put("http://localhost:4000/user/new-profile-img", formData, {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          Notif.success("Profile picture updated successfully");
          setFresh(!fresh);
          localStorage.setItem("photo", res.data.updateInfo.photo);
        })
        .catch((error) => {
          Notif.error("Error updating profile picture. Please try again");
          console.error(error);
        });
    }
  }

  const handleUsername = () => {
    axios.put('http://localhost:4000/user/update-info', {username}, {headers})
    .then((res)=>{
      Notif.success("Username updated successfully");
      setFresh(!fresh)
    })
    .catch((error)=>Notif.error("Error updating username. Please try again"));
  }

  const handleEmail = () => {
    axios.put('http://localhost:4000/user/update-info', {email}, {headers})
    .then((res)=>{
      Notif.success("Email updated successfully");
      setFresh(!fresh)
    })
    .catch((error)=>Notif.error("Error updating email. Please try again"));
  }

  const handlePassword = (e) => {
    e.preventDefault();
    const form = { password: password, newPassword: newPassword1 };
    axios.put('http://localhost:4000/user/update-info', form, { headers })
      .then((res) => {
        Notif.success("Password updated successfully");
        setPassword('');
        setNewPassword1('');
        setNewPassword2('');
      })
      .catch((error) => Notif.error("Error updating password. Please make sure your current password is correct and try again"));
  };

  return (
    <section className="d-flex flex-column min-vh-100">
      <Navbar/>
      <div className="mx-2">
        <div className="col-md-5 col-sm-5 mx-auto m-3 p-3 bg-spyellow rounded shadow-sm border-spdark">
          <div className="w-100 text-center">
            <div className="img-container mT-3">
              <img className="img-profile rounded-circle" src={photo?`http://localhost:4000/uploads/profiles/${photo}`:"/elements-img/profile-img.jpg"} alt={current.cusername}/>
              <div className="overlay rounded-circle">
                <a className="text-decoration-none" onClick={warning}><label htmlFor="fileInput">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FDBF50" className="icon-img-profile">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </label></a>
                <input type="file" id="fileInput" className="d-none" onChange={handlePhoto} accept="image/*" />
              </div>
            </div>
          </div>
          <h6 className="border-bottom-spdark text-spdark pb-2 mb-0"><strong>Suggestions</strong></h6>

            <div className="d-flex text-spdark pt-3">
              <div className="pb-3 mb-0 small lh-sm border-bottom-spdark w-100">
                <div className="d-flex justify-content-between pb-1">
                  <strong className="text-spdark">Username</strong>
                  <a className="text-spdark text-decoration-none" onClick={()=>setOpen({ ...open, u: !open.u })} data-bs-toggle="collapse" href="#collapseUsername" role="button" aria-expanded="false" aria-controls="collapseUsername">Edit</a>
                </div>
                {open.u === false ? (<span className="d-block">{current.cusername}</span>):""}
                <div className="collapse input-group" id="collapseUsername">
                  <input type="text" className="form-control" style={{height: "40px"}} id="username" name="username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                  <button className="btn-outline-spdark" type="button" onClick={handleUsername}>Save</button>
                </div>
              </div>
            </div>

            <div className="d-flex text-spdark pt-3">
              <div className="pb-3 mb-0 small lh-sm border-bottom-spdark w-100">
                <div className="d-flex justify-content-between pb-1">
                  <strong className="text-spdark">Email</strong>
                  <a className="text-spdark text-decoration-none" onClick={()=>setOpen({ ...open, e: !open.e })} data-bs-toggle="collapse" href="#collapseEmail" role="button" aria-expanded="false" aria-controls="collapseEmail">Edit</a>
                </div>
                {open.e === false ? (<span className="d-block">{current.cemail}</span>):""}
                <div className="collapse input-group" id="collapseEmail">
                  <input type="text" className="form-control" style={{height: "40px"}} id="email" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  <button className="btn-outline-spdark" type="button" onClick={handleEmail}>Save</button>
                </div>
              </div>
            </div>

            <div className="d-flex text-spdark pt-3">
              <div className="mb-0 small lh-sm w-100">
                <div className="d-flex justify-content-between pb-1">
                  <strong className="text-spdark">Password</strong>
                  <a className="text-spdark text-decoration-none" data-bs-toggle="collapse" href="#collapsePassword" role="button" aria-expanded="false" aria-controls="collapsePassword">Edit</a>
                </div>
                <form onSubmit={handlePassword} className="collapse" id="collapsePassword">
                  <input type="password" className="form-control mb-2" style={{height: "40px"}} id="password" name="password" placeholder="Current password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                  <input type="password" className="form-control mb-2" style={{height: "40px"}} id="newPassword1" name="newPassword1" placeholder="New password" value={newPassword1} onChange={(e)=>setNewPassword1(e.target.value)} required />
                  <input type="password" className="form-control mb-2" style={{height: "40px"}} id="newPassword2" name="newPassword2" placeholder="Re-type new password" value={newPassword2} onChange={(e)=>setNewPassword2(e.target.value)} required />
                  <button type="submit" className="btn btn-spdark float-end">Save</button>
                </form>
              </div>
            </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default Profile;
