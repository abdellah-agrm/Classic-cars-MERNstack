import { ArrowLeft } from "react-bootstrap-icons";
import Navbar from "./NavbarAndFooter/Navbar";
import Footer from "./NavbarAndFooter/Footer";

function Error404() {
  return(
    <section className="d-flex flex-column min-vh-100">
        <Navbar/>
        <div className="container py-5">
          <div className="row py-5 justify-content-center align-items-center">
            <div className="col-12 text-center text-spyellow">
              <h1 className="display-1 text-chiaroscura" style={{fontSize:"5rem"}}>404 Error</h1>
              <p className="h3 mb-0">Page not found</p>
              <p>Sorry, the page you are looking for could not be found or has been removed.</p>
              <div className="mt-4"></div>
              <a className="gobacklink" href="/home"><ArrowLeft style={{width: "25px", height: "auto", marginRight: "5px"}} /> Go back to Home</a>
            </div>
          </div>
        </div>
        <Footer/>
    </section>
  );
}

export default Error404;
