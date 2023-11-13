import "../../assets/css/additions-styles.css";
import Footer from "../NavbarAndFooter/Footer";

function TermsConditions() {
  return(
    <section>
      <div className="text-spyellow mx-3 mt-2">
        <a href="/sign-up">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FDBF50" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
        </a>
      </div>
      <div className="container my-5">
        <div className="text-spwhite">
          <div className="text-center mx-auto w-50">
            <h1 className="text-spyellow text-chiaroscura fw-bolder display-5">Terms & Conditions</h1>
            <p className="h5">Read our terms below to learn more about your rights and responsibilities as a user.</p>
          </div>

          <div className="mx-auto w-75 mt-5">
            <p className="fw-bolder h5">Last update: <span className="text-spyellow">13th of October, 2023</span></p>
            <hr className="text-spwhite"/>
            <span className="my-3">
              <h2 className="mt-4 text-spyellow">Lorem ipsum dolor sit amet</h2>
              Nulla lorem libero, porttitor vitae dolor a, varius euismod lorem. Etiam sit amet nunc ac enim laoreet condimentum vel vitae lorem. Cras vestibulum massa nec euismod tempus. Ut consectetur nunc et malesuada gravida. Maecenas mattis nibh at blandit mollis. Vestibulum hendrerit viverra massa, in pulvinar dolor tempus vel. Maecenas sapien odio, tristique et consectetur ac, aliquet vel turpis.
              
              <h2 className="mt-4 text-spyellow">Vivamus auctor nisl sit amet quam lobortis</h2>
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tortor urna, pretium at laoreet at, porttitor eu nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque eget aliquet justo. Cras massa sem, bibendum ut massa viverra, euismod commodo nibh. Proin sit amet magna ac neque laoreet posuere eu quis quam.

              <h2 className="mt-4 text-spyellow">Etiam nec enim non orci semper ultricies</h2>
              Donec vitae dui purus. Suspendisse nec tortor ipsum. Ut auctor pulvinar commodo. Integer pellentesque nunc id ornare imperdiet. Pellentesque pharetra justo sed quam lacinia finibus. In vehicula velit vitae massa mattis tempor non quis lorem. Sed accumsan turpis at augue blandit, vitae maximus massa bibendum. Donec volutpat at ligula nec dignissim.

              <h2 className="mt-4 text-spyellow">Donec malesuada turpis turpis</h2>
              Proin pharetra, libero eu pellentesque hendrerit, orci dolor sagittis elit, id vestibulum tortor libero et turpis. Integer sed ante eu leo pellentesque aliquam. Integer id magna in sem gravida dapibus nec sit amet turpis. Vivamus a tellus cursus, blandit purus vel, tristique dolor. Ut eu orci ornare, tempor dui in, sollicitudin enim.

            </span>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
}

export default TermsConditions;