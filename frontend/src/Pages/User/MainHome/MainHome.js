import Navbar from "../../NavbarAndFooter/Navbar";
import MainCarousel from "./MainCarousel";
import CarsCarousel from "./CarsCarousel";
import FAQs from "./FAQs";
import ClientsOpinion from "./ClientsOpinion";
import Footer from "../../NavbarAndFooter/Footer";

export default function MainHome(){
  return(<>
    <Navbar/>
    <a href="/new-car" className="fixed-button rounded-circle bg-spyellow p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2A2C41" className="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
      </svg>
    </a>
    <MainCarousel/>
    <CarsCarousel/>
    <ClientsOpinion/>
    <FAQs/>
    <Footer/>
  </>);
}