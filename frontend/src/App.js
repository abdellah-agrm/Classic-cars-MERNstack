import {Routes, Route} from "react-router-dom";

import SignIn from "./Pages/SignPages/SignIn";
import SignUp from "./Pages/SignPages/SignUp";
import TermsConditions from "./Pages/SignPages/Terms&Conditions";

import Error404 from "./Pages/Error404";
// ======================== User =========================
import MainHome from "./Pages/User/MainHome/MainHome";
import NewCar from "./Pages/User/CrudPages/NewCar";
import UpdateCar from "./Pages/User/CrudPages/UpdateCar";

import Profile from "./Pages/User/UsersMenu/Profile";
import MyFavorites from "./Pages/User/UsersMenu/MyFavorites";
import MyCollection from "./Pages/User/UsersMenu/MyCollection";
import ContactUs from "./Pages/User/UsersMenu/ContactUs";
import YourOpinion from "./Pages/User/UsersMenu/YourOpinion";

// ======================== Admin =========================
import SideBar from "./Pages/Admin/SideBar";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<MainHome/>}/>

      <Route path="/new-car" element={<NewCar/>}/>
      <Route path="/update-car/:id" element={<UpdateCar/>}/>
      
      <Route path="/account/bookmarks" element={<MyFavorites/>}/>
      <Route path="/account/my-collection" element={<MyCollection/>}/>
      <Route path="/account/contact" element={<ContactUs/>}/>
      <Route path="/account/your-opinion" element={<YourOpinion/>}/>
      <Route path="/account/profile" element={<Profile/>}/>

      <Route exact path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/sign-up/terms-conditions" element={<TermsConditions/>}/>

      <Route path="/dashboard" element={<SideBar/>}/>
      
      <Route path="*" element={<Error404/>}/>
    </Routes>
  );
}

export default App;