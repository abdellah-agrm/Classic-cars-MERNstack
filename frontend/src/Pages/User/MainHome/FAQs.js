import React, {useState} from "react";
import { Plus, Dash } from "react-bootstrap-icons";


function FAQs() {
  const [open, setOpen] = useState(false);
  const allfaqs = [
    {
        "qs": "What is Classic Cars Club?",
        "as": "Classic Cars Club is an online platform dedicated to classic car enthusiasts. It allows users to discover, add, and showcase their classic car collections to a community of like-minded individuals."
    },
    {
        "qs": "How can I add my classic car to the platform?",
        "as": "To add your classic car, navigate to the 'Add Car' section, fill in the required details (model, brand, year, speed, and image), and submit the information. Your car will be pending approval by our admin."
    },
    {
        "qs": "What are the image requirements for classic cars?",
        "as": "To maintain the quality and authenticity of our classic cars, we require that images of your classic car be in PNG format and have a transparent background."
    },
    {
        "qs": "How long does it take for my car to be approved by the admin?",
        "as": "The approval process may take some time as our admin ensures that each submission complies with our image requirements and community guidelines. You will receive a notification once your car is approved."
    },
    {
        "qs": "Can I update the details of my classic car?",
        "as": "Yes, you can update the details of your classic car. Navigate to the 'My Cars' section, select the car you want to edit, and make the necessary changes. Your updated information will go through an approval process."
    },
    {
        "qs": "Can I remove my classic car from the platform?",
        "as": "You have the option to delete your classic car from the platform. Navigate to the 'My Cars' section, select the car you want to remove, and confirm the deletion."
    },
    {
        "qs": "What happens if my classic car doesn't meet the platform's criteria?",
        "as": "If your classic car submission doesn't meet our criteria (e.g., image format), it will not be approved. You will receive feedback on how to meet the requirements and resubmit."
    },
    {
        "qs": "How can I connect with other classic car enthusiasts on Classic Cars Club?",
        "as": "You can engage with other users by exploring the 'Community' section, where you can view and appreciate other classic cars."
    },
    {
        "qs": "Is my personal information secure on the platform?",
        "as": "We take user privacy seriously. Your personal information is kept secure, and we have strict policies in place to protect your data."
    },
    {
        "qs": "How can I reach out to the support team if I have questions or issues?",
        "as": "You can reach our support team via the 'Contact Us' page. We are here to assist you with any questions, issues, or feedback you may have."
    }
  ];

  return (
    <section id="FAQs" className="py-5">
      <div className="container-fluid">
        <div className="text-spyellow text-center py-3 mb-2">
          <p className="text-chiaroscura display-5 my-0">Most Frequently Asked</p>
          <p className="text-inter h4">Questions in FAQS</p>
        </div>
        <div className="row">
        {allfaqs.map((faq, index) => (
          <div className="col-md-6 my-1" key={index} id="collapseIndicatorExampleTwoDark">
            <div className={`card bg-spdark ${open === true ? 'border-spyellow':''}`}>
              <a href={`#${index}`} className="card-header bg-spyellow collapse-indicator-plus text-decoration-none" onClick={()=>setOpen(!open)} id="headingExampleThreeDark" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseIndicatorPlusDark">
                {faq.qs}
                {open === false ? <Plus className="float-end" width={25} height={25}/> : <Dash className="float-end" width={25} height={25}/>}
              </a>

              <div id={index} className="collapse text-white" aria-labelledby="headingExampleThreeDark" data-bs-parent="#collapseIndicatorExampleTwoDark">
                <div className="card-body">
                  {faq.as}
                </div>
              </div>
            </div>
          </div>
        ))
        }
        </div>
      </div>
    </section>
  );
}

export default FAQs;
