import React from "react";
import Accordion from "react-bootstrap/Accordion";
const FAQs = () => {
  const faqData = [
    {
      heading: "What is Careerli ?",
      description:
        "Friendly and outgoing Customer Service Representative with 7 years of experience in busy call centers. Proven ability to deliver exceptional customer service and to resolve issues promptly. ",
    },
    {
      heading: "What is Careerli ?",
      description:
        "Friendly and outgoing Customer Service Representative with 7 years of experience in busy call centers. Proven ability to deliver exceptional customer service and to resolve issues promptly. ",
    },
    {
      heading: "What is Careerli ?",
      description:
        "Friendly and outgoing Customer Service Representative with 7 years of experience in busy call centers. Proven ability to deliver exceptional customer service and to resolve issues promptly. ",
    },
    {
      heading: "What is Careerli ?",
      description:
        "Friendly and outgoing Customer Service Representative with 7 years of experience in busy call centers. Proven ability to deliver exceptional customer service and to resolve issues promptly. ",
    },
  ];
  return (
    <div className="faqs">
      <div className="container">
        <div className="heading-area">
          <div className="heading1">FAQs</div>
          <p>frequently asked questions</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="faqs-accordian">
              <Accordion defaultActiveKey="0" flush>
                {faqData.map((item, i) => (
                  <Accordion.Item eventKey={`${i}`} key={`single-item${i}`}>
                    <Accordion.Header>{item.heading}</Accordion.Header>
                    <Accordion.Body>{item.description}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
